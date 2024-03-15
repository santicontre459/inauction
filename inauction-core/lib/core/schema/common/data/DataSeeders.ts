import { User, UserPosition, UserRegistrationMethod, UserStatus, UserRegistrationType } from '../../user';
import { Role, RoleStatus } from '../../role';
import { LegalForm, LegalFormStatus } from '../../legalForm';
import { Uom, UomStatus } from '../../uom';
import { BusinessOperation, BusinessOperationStatus } from "../../businessOperation";
import { PasswordEncryption } from '../../../controller/common/passwordEncryption/encryption';
import { getRepository } from 'typeorm';
import { Currency, CurrencyStatus} from "../../currency";
import { EventCategory, EventCategoryStatus} from "../../eventCategory";
import { TaskNames } from "../../taskNames";
import { TaskTypes } from "../../taskTypes";
import { Category, CategoryStatus } from "../../category";
import { Activity, ActivityStatus } from "../../activity";

export class DataSeeders {

    // DataSeeders for Business Operations/Main Activities
    public static async addBusinessOperations(): Promise<void> {
        const bussinessOperationRepository = getRepository(BusinessOperation);

        const businessOperations = [
            {
                "name": "Agriculture, forestry and fishing",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Mining and quarrying",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Manufacturing",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Electricity, gas, steam and air conditioning supply",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Water supply, sewerage, waste management and remediation activities",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Construction",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Wholesale and retail trade; repair of motor vehicles and motorcycles",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Transportation and storage",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Accommodation and food service activities",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Information and communication",
                "status": BusinessOperationStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
        ];

        for (let k = 0; k < businessOperations.length; k++) {
            let businessOperation = new BusinessOperation();
            businessOperation.name = businessOperations[k]['name'];
            businessOperation.status = businessOperations[k]['status'];
            businessOperation.createdAt = businessOperations[k]['createdAt'];
            businessOperation.modifiedAt = businessOperations[k]['modifiedAt'];
            await bussinessOperationRepository.save(businessOperation);
        }
    }

    // DataSeeders for Currencies
    public static async addCurrencies(): Promise<void> {
        const currencyRepository = getRepository(Currency);

        const currencies = [
            {
                "title": "Albanian Lek",
                "slug": "ALL",
                "status": CurrencyStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "Euro",
                "slug": "EUR",
                "status": CurrencyStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "US Dollar",
                "slug": "USD",
                "status": CurrencyStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
        ];

        for (let k = 0; k < currencies.length; k++) {
            let currency = new Currency();
            currency.title = currencies[k]['title'];
            currency.slug = currencies[k]['slug'];
            currency.status = currencies[k]['status'];
            currency.createdAt = currencies[k]['createdAt'];
            currency.modifiedAt = currencies[k]['modifiedAt'];
            await currencyRepository.save(currency);
        }
    }

    // DataSeeders for Event Categories
    public static async addEventCategories(): Promise<void> {
        const eventCategoryRepository = getRepository(EventCategory);

        const eventCategories = [
            {
                "name": "Works",
                "description": "Works",
                "status": EventCategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Services",
                "description": "Services",
                "status": EventCategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "Goods",
                "description": "Goods",
                "status": EventCategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
        ];

        for (let k = 0; k < eventCategories.length; k++) {
            let eventCategory = new EventCategory();
            eventCategory.name = eventCategories[k]['name'];
            eventCategory.description = eventCategories[k]['description'];
            eventCategory.status = eventCategories[k]['status'];
            eventCategory.createdAt = eventCategories[k]['createdAt'];
            eventCategory.modifiedAt = eventCategories[k]['modifiedAt'];
            await eventCategoryRepository.save(eventCategory);
        }
    }

    // DataSeeders for Company Legal Forms
    public static async addLegalForms(): Promise<void> {
        const legalFormRepository = getRepository(LegalForm);

        const legalForms = [
            {
                "title": "SE",
                "description": "Sole Entrepreneur",
                "status": LegalFormStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "JSC",
                "description": "Joint Stock Company",
                "status": LegalFormStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "LLC",
                "description": "Limited Liability Company",
                "status": LegalFormStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
        ];

        for (let k = 0; k < legalForms.length; k++) {
            let legalForm = new LegalForm();
            legalForm.title = legalForms[k]['title'];
            legalForm.description = legalForms[k]['description'];
            legalForm.status = legalForms[k]['status'];
            legalForm.createdAt = legalForms[k]['createdAt'];
            legalForm.modifiedAt = legalForms[k]['modifiedAt'];
            await legalFormRepository.save(legalForm);
        }
    }

    // DataSeeders for Measurement Units
    public static async addMeasurementUnits(): Promise<void> {
        const uomRepository = getRepository(Uom);

        const uoms = [
            {
                "title": "M",
                "status": UomStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "M2",
                "status": UomStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "M3",
                "status": UomStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "Piece",
                "status": UomStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "Box",
                "status": UomStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "Package",
                "status": UomStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "Kg",
                "status": UomStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "L",
                "status": UomStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "title": "Days",
                "status": UomStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
        ];

        for (let k = 0; k < uoms.length; k++) {
            let uom = new Uom();
            uom.title = uoms[k]['title'];
            uom.status = uoms[k]['status'];
            uom.createdAt = uoms[k]['createdAt'];
            uom.modifiedAt = uoms[k]['modifiedAt'];
            await uomRepository.save(uom);
        }
    }

    // DataSeeders for System Roles
    public static async addRoles(): Promise<void> {

        const roleRepository = getRepository(Role);

        const roles = [
            {
                "id": 1,
                "name": "Superadmin",
                "description": "Superadmin",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": false,
                "parentRole": null,
            },
            {
                "id": 2,
                "name": "Host",
                "description": "Host",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": false,
                "parentRole": null,
            },
            {
                "id": 3,
                "name": "Bidder",
                "description": "Bidder",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": false,
                "parentRole": null,
            },
            {
                "id": 4,
                "name": "Audit",
                "description": "Audit",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": false,
                "parentRole": null,
            }
        ];


        for (let k = 0; k < roles.length; k++) {
            let role = new Role();
            role.id = roles[k]['id'];
            role.roleName = roles[k]['name'];
            role.status = roles[k]['status'];
            role.description = roles[k]['description'];
            role.createdAt = roles[k]['createdAt'];
            role.modifiedAt = roles[k]['modifiedAt'];
            role.isSubRole = roles[k]['isSubRole'];
            role.parentRole = roles[k]['parentRole'];
            await roleRepository.save(role);
        }
    }

    // DataSeeders for System SubRoles
    public static async addSubRoles(): Promise<void> {

        const roleRepository = getRepository(Role);

        let SuperadminRole = roleRepository.findOne(1);
        let HostRole = roleRepository.findOne(2);
        let BidderRole = roleRepository.findOne(3);

        const subRoles = [
            {
                "id": 5,
                "name": "Admin",
                "description": "Superadmin Admin",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": true,
                "parentRole": SuperadminRole,
            },
            {
                "id": 6,
                "name": "Finance",
                "description": "Superadmin Finance",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": true,
                "parentRole": SuperadminRole,
            },
            {
                "id": 7,
                "name": "Admin",
                "description": "Host Admin",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": true,
                "parentRole": HostRole,
            },

            {
                "id": 8,
                "name": "Expert",
                "description": "Host Expert",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": true,
                "parentRole": HostRole,
            },

            {
                "id": 9,
                "name": "Admin",
                "description": "Bidder Admin",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": true,
                "parentRole": BidderRole,
            },

            {
                "id": 10,
                "name": "Expert",
                "description": "Bidder Expert",
                "status": RoleStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
                "isSubRole": true,
                "parentRole": BidderRole,
            },
        ];


        for (let i = 0; i < subRoles.length; i++) {
            let subRole = new Role();
            subRole.id = subRoles[i]['id'];
            subRole.roleName = subRoles[i]['name'];
            subRole.status = subRoles[i]['status'];
            subRole.description = subRoles[i]['description'];
            subRole.createdAt = subRoles[i]['createdAt'];
            subRole.modifiedAt = subRoles[i]['modifiedAt'];
            subRole.isSubRole = subRoles[i]['isSubRole'];
            subRole.parentRole = await subRoles[i]['parentRole'];
            await roleRepository.save(subRole);
        }
    }

    // DataSeeder for Superadmin Admin User
    public static async addUser(): Promise<void> {
        let user = new User();
        const userRepository = getRepository(User);
        const roleRepository = getRepository(Role);

        // Superadmin
        let SuperadminRole = roleRepository.findOne(1);

        // Admin
        let SuperadminSubRole = roleRepository.findOne(5);

        user.role = await SuperadminRole;
        user.subrole = await SuperadminSubRole;
        user.firstName = "Eglon";
        user.lastName = "Metalia";
        user.email = "eglon.metalia@inegotio.com";
        user.password = PasswordEncryption.hashPassword("Sup3b0s5!Egl!@in2021--");
        user.status = UserStatus.ACTIVE;
        user.email_verified = true;
        user.verification_status = 'VERIFIED';
        user.phoneNumber = "+355673010355";
        user.registrationMethod = UserRegistrationMethod.SUPERADMIN;
        user.registrationType = UserRegistrationType.INITIAL_DB_SEEDER;
        user.firstLogin = new Date();
        user.lastLogin = new Date();
        user.company = null;
        user.position = UserPosition.Chief_Executive_Officer;
        user.isDeleted = false;
        user.createdAt = new Date();
        user.modifiedAt = new Date();
        user.modifiedBy = null;

        await userRepository.save(user);
    }

    // DataSeeders for Task Names
    public static async addTaskNames(): Promise<void> {
        const taskNameRepository = getRepository(TaskNames);

        const taskNames = [
            {
                "id": 1,
                "name": "CREATE_EVENT_RELATED",
            },
            {
                "id": 2,
                "name": "DRAFT_EVENT_RELATED",
            },
            {
                "id": 3,
                "name": "EVALUATION_EVENT_RELATED",
            },
            {
                "id": 4,
                "name": "RESPOND_QUESTIONNAIRES",
            },
            {
                "id": 5,
                "name": "OTHER",
            },
        ];

        for (let k = 0; k < taskNames.length; k++) {
            let taskName = new TaskNames();
            taskName.id = taskNames[k]['id'];
            taskName.name = taskNames[k]['name'];
            await taskNameRepository.save(taskName);
        }
    }

    // DataSeeders for Task Types
    public static async addTaskTypes(): Promise<void> {
        const taskTypeRepository = getRepository(TaskTypes);

        const taskNameRepository = getRepository(TaskNames);

        const taskTypes = [
            { "id": 1, "name": "CREATE_ONLY_SETTINGS", "taskName": taskNameRepository.findOne(1) },
            { "id": 2, "name": "CREATE_ENTIRE_EVENT", "taskName": taskNameRepository.findOne(1) },
            { "id": 3, "name": "UPDATE_SETTINGS", "taskName": taskNameRepository.findOne(2) },
            { "id": 4, "name": "UPDATE_QUESTIONNAIRES", "taskName": taskNameRepository.findOne(2) },
            { "id": 5, "name": "CREATE_DOCUMENTS", "taskName": taskNameRepository.findOne(2) },
            { "id": 6, "name": "UPDATE_DOCUMENTS", "taskName": taskNameRepository.findOne(2) },
            { "id": 7, "name": "CREATE_BILL_OF_QUANTITIES", "taskName": taskNameRepository.findOne(2) },
            { "id": 8, "name": "UPDATE_BILL_OF_QUANTITIES", "taskName": taskNameRepository.findOne(2) },
            { "id": 9, "name": "INVITE_BIDDERS", "taskName": taskNameRepository.findOne(2) },
            { "id": 10, "name": "EVALUATE_QUESTIONNAIRE_RESPONSES", "taskName": taskNameRepository.findOne(3) },
            { "id": 11, "name": "VERIFY_PARTICIPANTS_DOCUMENTS", "taskName": taskNameRepository.findOne(3) },
            { "id": 12, "name": "PREPARE_EVALUATION_REPORT", "taskName": taskNameRepository.findOne(3) },
            { "id": 13, "name": "FILL_BILL_OF_QUANTITIES", "taskName": taskNameRepository.findOne(4) },
            { "id": 14, "name": "OTHER", "taskName": taskNameRepository.findOne(5) },
        ];

        for (let k = 0; k < taskTypes.length; k++) {
            let taskType = new TaskTypes();
            taskType.id = taskTypes[k]['id'];
            taskType.name = taskTypes[k]['name'];
            taskType.taskName = await taskTypes[k]['taskName'];
            await taskTypeRepository.save(taskType);
        }
    }

    // DataSeeders for Activity Categories
    public static async addActivityCategories(): Promise<void> {
        const categoryRepository = getRepository(Category);

        const categories = [
            {
                "name": "AGRICULTURE, FORESTRY AND FISHING",
                "code": "A",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "MINING AND QUARRYING",
                "code": "B",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "MANUFACTURING",
                "code": "C",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "ELECTRICITY, GAS, STEAM AND AIR CONDITIONING SUPPLY",
                "code": "D",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "WATER SUPPLY; SEWERAGE, WASTE MANAGEMENT AND REMEDIATION ACTIVITIES",
                "code": "E",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "CONSTRUCTION",
                "code": "F",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "WHOLESALE AND RETAIL TRADE; REPAIR OF MOTOR VEHICLES AND MOTORCYCLES",
                "code": "G",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "TRANSPORTATION AND STORAGE",
                "code": "H",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "ACCOMMODATION AND FOOD SERVICE ACTIVITIES",
                "code": "I",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "INFORMATION AND COMMUNICATION",
                "code": "J",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "FINANCIAL AND INSURANCE ACTIVITIES",
                "code": "K",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "REAL ESTATE ACTIVITIES",
                "code": "L",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "PROFESSIONAL, SCIENTIFIC AND TECHNICAL ACTIVITIES",
                "code": "M",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "ADMINISTRATIVE AND SUPPORT SERVICE ACTIVITIES",
                "code": "N",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "PUBLIC ADMINISTRATION AND DEFENCE; COMPULSORY SOCIAL SECURITY",
                "code": "O",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "EDUCATION",
                "code": "P",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "HUMAN HEALTH AND SOCIAL WORK ACTIVITIES",
                "code": "Q",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "ARTS, ENTERTAINMENT AND RECREATION",
                "code": "R",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "OTHER SERVICE ACTIVITIES",
                "code": "S",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "ACTIVITIES OF HOUSEHOLDS AS EMPLOYERS; UNDIFFERENTIATED GOODS- AND SERVICES-PRODUCING ACTIVITIES OF HOUSEHOLDS FOR OWN USE",
                "code": "T",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "name": "ACTIVITIES OF EXTRATERRITORIAL ORGANISATIONS AND BODIES",
                "code": "U",
                "status": CategoryStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
        ];

        for (let k = 0; k < categories.length; k++) {
            let category = new Category();
            category.name = categories[k]['name'];
            category.code = categories[k]['code'];
            category.status = categories[k]['status'];
            category.createdAt = categories[k]['createdAt'];
            category.modifiedAt = categories[k]['modifiedAt'];
            await categoryRepository.save(category);
        }
    }

    // DataSeeders for Currencies
    public static async addActivities(): Promise<void> {


        const categoryRepository = getRepository(Category);
        const activityRepository = getRepository(Activity);

        const activities = [
            {
                "category": categoryRepository.findOne({ where : { code : 'A' } }),
                "name": "Crop and animal production, hunting and related service activities",
                "code": "A1",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'B' } }),
                "name": "Mining of coal and lignite",
                "code": "B5",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'C' } }),
                "name": "Manufacture of food products",
                "code": "C10",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'D' } }),
                "name": "Electricity, gas, steam and air conditioning supply",
                "code": "D35",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'R' } }),
                "name": "Water collection, treatment and supply",
                "code": "E36",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'F' } }),
                "name": "Construction of buildings",
                "code": "F41",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'G' } }),
                "name": "Wholesale and retail trade and repair of motor vehicles and motorcycles",
                "code": "G45",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'H' } }),
                "name": "Land transport and transport via pipelines",
                "code": "H49",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'I' } }),
                "name": "Accommodation",
                "code": "I51",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'J' } }),
                "name": "Publishing activities",
                "code": "J58",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'K' } }),
                "name": "Financial service activities, except insurance and pension funding",
                "code": "K64",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'L' } }),
                "name": "Real estate activities",
                "code": "L68",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'M' } }),
                "name": "Legal and accounting activities",
                "code": "M69",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'N' } }),
                "name": "Rental and leasing activities",
                "code": "N77",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'O' } }),
                "name": "Public administration and defence; compulsory social security",
                "code": "O84",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'P' } }),
                "name": "Education",
                "code": "P85",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'Q' } }),
                "name": "Human health activities",
                "code": "Q86",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'R' } }),
                "name": "Creative, arts and entertainment activities",
                "code": "R90",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'S' } }),
                "name": "Activities of membership organisations",
                "code": "S94",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'T' } }),
                "name": "Activities of households as employers of domestic personnel",
                "code": "T97",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
            {
                "category": categoryRepository.findOne({ where : { code : 'U' } }),
                "name": "Activities of extraterritorial organisations and bodies",
                "code": "U99",
                "status": ActivityStatus.ACTIVE,
                "createdAt": new Date(),
                "modifiedAt": new Date(),
            },
        ];

        for (let k = 0; k < activities.length; k++) {
            let activity = new Activity();
            activity.name = activities[k]['name'];
            activity.code = activities[k]['code'];
            activity.category = await activities[k]['category'];
            activity.status = activities[k]['status'];
            activity.createdAt = activities[k]['createdAt'];
            activity.modifiedAt = activities[k]['modifiedAt'];
            await activityRepository.save(activity);
        }
    }
}
