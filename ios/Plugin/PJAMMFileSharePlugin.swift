import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(PJAMMFileSharePlugin)
public class PJAMMFileSharePlugin: CAPPlugin {
    private let implementation = PJAMMFileShare()

    @objc func downloadFile(_ call: CAPPluginCall) {
        
        guard let fileData:String = call.getString("data") else {
            call.reject("File Data not provided")
            return
        }
        
        guard let filename:String = call.getString("filename") else {
            call.reject("Filename not provided")
            return
        }
        
        var tempURL = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
        tempURL.appendPathComponent(filename)
        
        do {
            try fileData.write(to: tempURL, atomically: true, encoding: .utf8)
        } catch {
            call.reject("Unable to write temp file")
            return;
        }

        DispatchQueue.main.async { [weak self] in
            
            guard let self = self else {
                call.reject("Self reference error")
                return
            }
            
            let actView = UIActivityViewController(activityItems: [tempURL], applicationActivities: nil)
            
            actView.setValue("Activity Path Data - PJAMM Cycling App", forKey: "subject")
            
            actView.completionWithItemsHandler = { (activityType, completed, _ returnedItems, activityError) in
                if activityError != nil {
                    call.reject("Error sharing item", nil, activityError)
                    return
                }
                
                if completed {
                    call.resolve([
                        "activityType":activityType?.rawValue ?? ""
                    ])
                } else {
                    call.reject("Share canceled")
                }
            }
            
            if self.bridge?.viewController?.presentedViewController != nil {
                call.reject("Sharing already in progress.")
                return
            }
            
            self.setCenteredPopover(actView)
            self.bridge?.viewController?.present(actView, animated: true, completion: nil)
        }
    }
}
