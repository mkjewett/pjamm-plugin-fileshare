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
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}
