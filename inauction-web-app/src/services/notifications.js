import {setPusherClient} from 'react-pusher';
import Pusher from 'pusher-js';
import {Howl} from 'howler';
import Config from "../api/config";

const pusherClient = new Pusher(Config.PUSHER.KEY, {
  cluster: Config.PUSHER.CLUSTER,
  forceTLS: true
});

setPusherClient(pusherClient);

const playNotificationSound = () => {
  const sound = new Howl({
    html5: true,
    autoplay: true,
    src: ['../audio/ting.mp3'],
    volume: 1,
  });
  sound.play();
};

const setup = (userId, onNotificationReceived) => {
  const channel = pusherClient.subscribe(`user.${userId}`);
  channel.bind('received-notification', ({notification}) => {
    playNotificationSound();
    onNotificationReceived(notification);
  });
};

const removeListener = (userId) => {
  pusherClient.unsubscribe(`user.${userId}`);
};

export const setupNotifications = setup;
export const removeNotificationListener = removeListener;
