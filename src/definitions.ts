export interface PJAMMFileSharePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
