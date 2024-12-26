import { BuildOptions } from "./types/config";
import  type { Configuration  as devServerConfig} from 'webpack-dev-server'


export function buildDevServer(options:BuildOptions):devServerConfig{
    return {
        port: options.port,
        open: true,
        historyApiFallback: true
    }
}