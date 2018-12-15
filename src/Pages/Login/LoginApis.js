import { timServiceInstance } from '../../Constants/services';

export const changePWDApi = params => timServiceInstance.post(`/password/change/`, params);
