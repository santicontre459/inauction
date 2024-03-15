import { ActivityStatus } from '../../schema/activity';

export interface IActivity {
    id?: string;
    name: string;
    code: string;
    category?: string;
    status?: ActivityStatus;
}