import LoggerInterface, {LOG_LEVELS} from "./loggerInterface"

export default class ConsoleLogger implements LoggerInterface {
    public log(content: any, title?: string, level: keyof typeof LOG_LEVELS = LOG_LEVELS.DEBUG) {
        if (title) {
            title = level + ': ' + title
            console.log('====================================')
            console.log(title)
            console.log('====================================')
        } else {
            console.log(level + ':')
        }
        console.log(content)
    }
}
