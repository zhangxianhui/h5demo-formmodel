import http from './config';


const domain = '/api/v2/integral';


function $get(url) {
    return function(params) {
        const uri = `${domain}/${url}`;
        const getFunc = params
            ? http.get(uri, { params })
            : http.get(uri);
        return getFunc.then(({ data }) => data);
    }
}

export const getSpecialUserStatList = $get('specialUser');
export const getOrdinaryUserStatList = $get('ordinaryUser');

export const getSelectExchangePoint = $get('selectExchange');
export const getQueryList = $get('queryList');

export function setPointQuota(integralModification) {
    return http.put(`${domain}/updateIntegral?integralModification=${integralModification}`).then(({ data }) => data);
}

export function redeemPoint(userId, point) {
    return http.put(`${domain}/removeUserIntegralByUserId?userId=${userId}&integral=${point}`).then(({ data }) => data);
}