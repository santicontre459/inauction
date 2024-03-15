import { IRepo } from './../base/IBaseRepository';
import { Section } from '../../schema/section';

export interface ISectionRepository  extends IRepo<Section> {

    findById(id: string): Promise<Section>

    filterSection(filter: any): Promise<Section>

    getAll(): Promise<Array<Section>>

    updateSection(section_id: string, section_params: Section): Promise<Section>

    deleteSection(id: String): Promise<boolean>
}