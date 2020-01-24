import LoggerInterface, {LOG_LEVELS} from "./loggerInterface"

export default class NullLogger implements LoggerInterface {
    log(content: any, title?: string, level?: keyof typeof LOG_LEVELS) {
        // does nothing at all :) (Null Object Pattern)
    }
}
