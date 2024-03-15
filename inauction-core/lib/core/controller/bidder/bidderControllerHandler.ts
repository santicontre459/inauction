export class BidderControllerHandler {

    public static checkBidderRoleSubroleParameters(roleId: number, subRoleId: number): string {
        // check if it primary role or subrole
        var subroleId = subRoleId;
        var roleId =  roleId; //get roleId
        let query: any;
        query = { role: roleId , subrole:subroleId};
        return query;

    }

    public static checkBidderRoleParameters(roleId: number ): string {
        // check if it primary role or subrole
        var roleId =  roleId; //get roleId
        let query: any;
        query = { role: roleId , email_verified:true, status : 1};
        return query;
    }
}