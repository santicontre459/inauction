export enum Environments {
    local_environment = 'local',
    dev_environment = 'dev',
    prod_environment = 'prod',
    qa_environment = 'qa'
}

const NODE_ENV = process.env.NODE_ENV || Environments.local_environment

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getPort(): Number {
        if (this.environment === Environments.prod_environment) {
            return 8081;
        } else if (this.environment === Environments.dev_environment) {
            return 8082;
        } else if (this.environment === Environments.qa_environment) {
            return 8083;
        } else {
            return 3001;
        }
    }

    getDBName(): String {
        if (this.environment === Environments.prod_environment) {
            return 'inauction';
        } else if (this.environment === Environments.dev_environment) {
            return 'db_test_project_dev';
        } else if (this.environment === Environments.qa_environment) {
            return 'db_test_project_qa';
        } else {
            return 'db_test_project_local';
        }
    }

    getEnv(): String {
        return this.environment
    }
}

export default new Environment(NODE_ENV);
