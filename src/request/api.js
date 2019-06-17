import {get} from './http';

//调用车辆查询接口
export const getCarApi = (params) => get(`${serverIp}/alarm/car`,params );
//调用人员查询接口
export const getPeopleApi = (params) => get(`${serverIp}/alarm/face`,params );
//调用手机查询接口
export const getPhoneApi = (params) => get(`${serverIp}/alarm/phone`,params );
//调用报警核实情况下拉框接口
export const getAlarmSituationApi = (params) => get(`${serverIp}/alarm/check`,params );
//调用告警布控类型下拉框接口
export const getAlarmTypeApi = (params) => get(`${serverIp}/getAlarmType`,params );
//调用车道编号下拉框接口
export const getCdbhApi = (params) => get(`${serverIp}/getCdbh`,params );
//调用车牌颜色下拉框接口
export const getCpysApi = (params) => get(`${serverIp}/getCpys`,params );
//调用处置类型下拉框接口
export const getCzlxApi = (params) => get(`${serverIp}/getCzlx`,params );
//调用人脸库下拉框接口
export const getRlkApi = (params) => get(`${serverIp}/getRlk`,params );
//调用检查站下拉框接口
export const getStationApi = (params) => get(`${serverIp}/getStation`,params );
//调用摄像头下拉框接口
export const getSxtApi = (params) => get(`${serverIp}/getSxt`,params );
//人员上报接口
export const peopleReportApi = (params) => get(`${serverIp}/report/face`,params );
//车辆上报接口
export const carReportApi = (params) => get(`${serverIp}/report/car`,params );
//手机上报接口
export const phoneReportApi = (params) => get(`${serverIp}/report/phone`,params );
//地图点位接口
export const mapStationApi = (params) => get(`${mapPointIp}/findMapStationTjxx`,params );
