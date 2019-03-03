import * as schedule from 'node-schedule';
import Users from '../user';
import { getOne, getWeather } from '../superagent/index';

let morning = new schedule.RecurrenceRule();
morning.dayOfWeek = [new schedule.Range(1, 5)];
morning.hour = 8;
morning.minute = 30;

let afternoon = new schedule.RecurrenceRule();
afternoon.dayOfWeek = [new schedule.Range(1, 5)];
afternoon.hour = 18;
afternoon.minute = 0;

const scheduleInit = async (bot: any, users: Users) => {
    const user133 = await users.find('133');

    schedule.scheduleJob(morning, async function() {
        let { weatherTips } = await getWeather();
        user133.say(`老婆大人,该起床咯!今天,${weatherTips}`);
    });

    schedule.scheduleJob(afternoon, async function() {
        let { weatherTips } = await getWeather();
        user133.say(`下班了没啊?`);
    });
};

export default scheduleInit;
