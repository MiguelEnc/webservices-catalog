import UserRoutes from './domains/user/user.router';
import TeamRoutes from './domains/team/team.router';
import WebServiceRoutes from './domains/webservice/webservice.router';

export default {
    user: UserRoutes,
    team: TeamRoutes,
    service: WebServiceRoutes
};
