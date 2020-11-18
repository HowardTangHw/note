import React from 'react'
import * as C from "../constants"
import ajax from '../common/ajax';
import moment from 'moment'
const API_ENV = process.env.REACT_APP_API_URL_ENV;

export const getSubPlanList = (serviceType, dealName) => (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/plans/sub-services-plans';

    let payload = {
        "service_type":serviceType,
        "deal_name":dealName
    }
    return ajax.get(path, {headers:payload})
        .then(r => {
            return {...r.data, serviceType : serviceType, dealName : dealName};
        })
}
export const getPlanInfo = (lang, dealName, serviceType) => async (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/plans/plan-info';
    const planInfo = getState().sys.planInfo
    serviceType = serviceType ==='MINI_PKG' ? 'NULL': serviceType
    if(!planInfo[dealName]){
        let payload = {
            "lang":lang,
            "deal_name":dealName,
            "service_type":serviceType || 'NULL'
        }
        try{
            if(dealName){
                let res = await ajax.get(path,{headers:payload});
                if(res.data.status == 1){
                    dispatch({
                        type:C.SYS_SET_PLAN_INFO,
                        dealName,
                        data:res.data.plan_info
                    })                    
                }
                return res.data.plan_info;
            }
        }catch(err){
            return {}
        }

    }else{
        return planInfo[dealName]
    }
}

export const getPlanOffer = (lang, dealName, serviceType,serviceCode) => async (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/plans/plan-offers';

    let payload = {
        "lang":lang,
        "deal_name":dealName,
        "service_type":serviceType
    }

    try {
        let res = await ajax.get(path,{headers:payload});
        dispatch({
            type:C.STEP1_GET_PLAN_OFFER,
            serviceCode,
            data:res.data,
            offerType:'planOffer',
            dealName
        })
        return res.data;
    } catch (error) {
        throw Error(error);
    }
}


export const getMobileNewDnList = (newProvider) => (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/dn/mobile-new-dn-list';

    let payload = {
        "provider":newProvider,
        "pool_type":"OFFLINE",
        "num_rec":"30",
    }

    return ajax.get(path,{headers:payload})
        .then(r =>{
            return r.data;
        })
}

export const reserveMobileNewDn = (newDn, userId) => (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/dn/reserve-dn';

    let payload = {
        "msisdn":newDn,
        "staff":userId
    }

    return ajax.post(path,payload)
        .then(r =>{
            return r.data;
        })
}

export const pushState3 = (value, serviceType, planType, pushType, xeCount, subService) =>(
{
    type : C.STEP3_PUSH_STATE,
    value : value,
    serviceType : serviceType,
    planType : planType,
    pushType : pushType,
    xeCount : xeCount,
    subService : subService
})

export const pushState3Multiple = (value, serviceType, planType, subService, xeCount) =>(
    {
        type : C.STEP3_PUSH_STATE_MULTIPLE,
        value : value,
        serviceType : serviceType,
        planType : planType,
        subService : subService,
        xeCount : xeCount,
    })

export const step3Init = (retPlan, retPlanInfo, retSubPlan, retSubPlanInfo, upsellPlan, upsellPlanInfo, upsellSubPlan, upsellSubPlanInfo, selectedService, retServices, existMiniPkgs, existMiniPkgsInfo, existMiniPkgSubPlan, existMiniPkgSubPlanInfo, isStaffPlan, isAsUpgrade, isCmUpgrade, isAsMaint, isCmMaint, isArpuDown, isSuperRole, isT0T1Tvb, isCsiCampaign,terminationDate) => (
    {
        type: C.STEP3_INIT,
        retPlan: retPlan,
        retPlanInfo: retPlanInfo,
        retSubPlan: retSubPlan,
        retSubPlanInfo: retSubPlanInfo,
        upsellPlan: upsellPlan,
        upsellPlanInfo: upsellPlanInfo,
        upsellSubPlan: upsellSubPlan,
        upsellSubPlanInfo : upsellSubPlanInfo,
        selectedService: selectedService,
        retServices: retServices,
        existMiniPkgs: existMiniPkgs,
        existMiniPkgsInfo: existMiniPkgsInfo,
        existMiniPkgSubPlan: existMiniPkgSubPlan,
        existMiniPkgSubPlanInfo: existMiniPkgSubPlanInfo,
        isStaffPlan: isStaffPlan,
        isAsUpgrade: isAsUpgrade,
        isCmUpgrade: isCmUpgrade,
        isAsMaint: isAsMaint,
        isCmMaint: isCmMaint,
        isArpuDown: isArpuDown,
        isSuperRole: isSuperRole,
        isT0T1Tvb: isT0T1Tvb,
        isCsiCampaign: isCsiCampaign,
        terminationDate
    })

export const step3ChangeAutoRenewChoice = (autoRenewGroup) =>({
    type:C.STEP3_CHANGE_AUTO_RENEW_CHOICE,
    autoRenewGroup
})
export const changeAutoRenewCheck = (isCheckAutoRenew) =>({
    type:C.STEP3_CHECK_AUTO_RENEW,
    isCheckAutoRenew
})
export const changeStandaloneUpsellMeshWifiStatus = (isStandaloneUpsellMeshWifi) =>({
    type:C.STANDALONE_UPSELL_MESH_WIFI,
    isStandaloneUpsellMeshWifi
})
    
export const getEarlierCutoverDate = (payload) => (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + "/mnp/earlier-cutover-date"
    return ajax.get(path, {
        headers: {
            msisdn: payload.msisdn,
            provider: payload.provider,
            online_offline: payload.online_offline,
            delivery_method: payload.delivery_method,
            with_addr_code: payload.with_addr_code,
            is_family_plan: payload.is_family_plan,
            family_group_master: payload.family_group_master,
            family_plan_eff_date: payload.family_plan_eff_date,
            start_cal_date: payload.start_cal_date,
            program: payload.program,
        }
    }).then(r => {
        return r.data
    })
}
// check日期+時間段是否可用
export const getCutoverDateAvailable = (date, time, provider) => (dispatch, getState) => {
    // console.log("cutoverDate:", date, " cutoverTime", time)
    let path = C.API.RET_SERVICE_API + '/mnp/chk-valid-cutover-date';
    return ajax.get(path, {
        headers: {
            "cutover_date": date,
            "cutover_window": time,
            "provider": provider,
        },
    }
    ).then(r => {
        return r.data;
    })
}

//獲取equipCode (To get plan equipment mapping)
export const getPlanEquipmentMapping = (serviceType, dealName) => (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/plans/plan-equip-mapping';
    return ajax.get(path, {
        headers: {
            serviceType,
            dealName
        },
    }
    ).then(r => {
        // if(r.data.status == '1'){
        //     dispatch(getPlanOfferItemMaster(r.equipCode,dealName))
        // }
        return r.data;
    })
}
//get other equip (To get plan offer item master)
export const getPlanOfferItemMaster = (equipCode,dealName) => (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/plans/plan-offer-item-master';
    return ajax.get(path, {
        headers: {
            equipCode
        },
    }
    ).then(r => {
        if(r.data.status == '1'){
            dispatch(saveMeshOffer(r.data,dealName))
        }
    })
}

export const saveMeshOffer = (obj,dealName) => (dispatch,getState) =>{
    dispatch({
        type:C.STEP3_PUSH_MESH_OFFER,
        data:obj,
        dealName
    })
}

// export const verifyWifiLogin = (wifiLogin) => (dispatch, getState) => {
//     let path = C.API.RET_SERVICE_API + '/vas/chk-vas-id-avail';

//     let payload = {
//         "login_id":wifiLogin,
//         "channel":"ONLINE",
//         "mail_type":"HKBN_EMAIL"
//     }

//     return ajax.get(path,{headers:payload})
//         .then(r =>{
//             return r.data;
//     })
// }

// export const verifyVasLogin = (vasLogin) => (dispatch, getState) => {
//     let path = C.API.RET_SERVICE_API + '/vas/chk-vas-id-avail';

//     let payload = {
//         "login_id":vasLogin,
//         "channel":"ONLINE",
//         "mail_type":"PERSONAL_EMAIL"
//     }

//     return ajax.get(path,{headers:payload})
//         .then(r =>{
//             return r.data;
//     })
// }

export const verifyVasLogin = (serviceType, vasLogin) => (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/vas/chk-vas-id-status';

    let payload = {
        "service_type": serviceType,
        "login_id": vasLogin,
    }

    return ajax.get(path, {headers:payload})
        .then(r =>{
            return r.data;
    })
}

export const getMobileNewDn = (msisdn) => (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/dn/mobile-chk-dn-owner';
    let payload = {
        "msisdn":msisdn
    }

    return ajax.get(path,{headers:payload})
        .then(r =>{
            return r.data;
        })
}

export const getPlanEarlierStartDate = (retType, serviceType, dealName, startBillDate) => async (dispatch, getState) => {
    let path;
    let payload = {
        "service_type":serviceType,
        "deal_name":dealName
    }

    if (retType === 'RET') {
        path = C.API.RET_SERVICE_API + '/plans/plan-earliest-date-ret';
    } else {
        path = C.API.RET_SERVICE_API + '/plans/plan-earliest-date';
    }
    try {
        let res = await ajax.get(path,{headers:payload});
        res.data.startBillDate = startBillDate;
        return res.data;
    } catch (error) {
        throw Error(error);
    }
}

export const getCampaignMapping = (dealName) => (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/campaign/get-campaign-mapping';

    let payload = {
        "dealName":dealName
    }

    return ajax.get(path,{headers:payload})
        .then(r =>{
            return r.data;
        })
}

export const getDnLinkup = (serviceType, serviceCode) => async (dispatch, getState) => {
    let path = C.API.RET_SERVICE_API + '/services/get-linkup-id';
    let payload = {
        "service_type": serviceType,
        "service_code": serviceCode
    }
    return await ajax.get(path,{headers:payload})
        .then(r => {
            return r.data;
        })
}
export const checkingTvbMiniPkgDedup=(payload)=>(dispatch, getState) => {
    let path = C.API.TVB_MINIPKG_API + '/minipack/dedup';
    return ajax.post(path, payload)
    .then(r => {
        return r.data;
    })
}

export const getNewCpeQuotaAvail = async({orderAction,orderType, startDate,address_code,isCanSelectDummyInstFlag}) => {
    try{
    let path = C.API.CPE_QUOTA_API + '/cpe-quota-avail';
    let payload = {
        address_code:address_code,
        company:'HKBN',
        customer_type:'NORMAL',
        order_action:orderAction,
        order_type:orderType,
        platform:'RET2019_CPM',
        requestor_ref_no:window.salesCode,
        requestor_type:'SALES',
        schedule_type:'SCH',
        start_date:startDate,
        end_date:startDate,
    }

    let res = await ajax.get(path,{headers:payload});
    if(res.data['status']=="1") return res.data['quota_avail_list'];
    let canSkipStatus = ['-2','-8','-3','-4','-7','-9','-11','-5','-6','-10'];

    if(canSkipStatus.includes(res.data['status']) && isCanSelectDummyInstFlag){
        throw new Error(`${res.data.message},Can select dummy date`)
    }
    
    throw new Error(`CPE ISSUE:${res.data.message||res.data.status}`)
    }catch(err){
        throw new Error(err);
    }
}

export const getNewCpeQuotaAvailArr = (cpeQuotaControl,startDate,isCanSelectDummyInstFlag) => async(dispatch, getState)=>{
    let rootState = getState();
    const {step1} = rootState;
    let address_code = null;
    try{
        if(step1.step1UI.services[0]){
            address_code = step1.step1UI.services[0].serviceAddr.addrCode
        }else{
            throw new Error('客戶不存在Address Code,無法選擇安裝日期')
        }
        const {isInstallQuota,installCpeOrderType,isMaintQuota,maintOrderType,isShQuota,shCpeOrderType} = cpeQuotaControl;
        const FLAG_COUNT = ~~isInstallQuota  + ~~isMaintQuota + ~~isShQuota;
        let promiseArr = [];
        if(isInstallQuota){
            promiseArr[0]=getNewCpeQuotaAvail({orderAction:'INST',orderType:installCpeOrderType,startDate,address_code,isCanSelectDummyInstFlag})
        }
        if(isMaintQuota)  promiseArr[1] =getNewCpeQuotaAvail({orderAction:'MAIN',orderType:maintOrderType,startDate,address_code,isCanSelectDummyInstFlag})
        if(isShQuota) promiseArr[2] = getNewCpeQuotaAvail({orderAction:'INST',orderType:shCpeOrderType,startDate,address_code,isCanSelectDummyInstFlag});
        // index 0為INST 1為MAINT 2為SH
        const allTimeArr = await Promise.all(promiseArr);
        let tempObj = {};
        for(let index in allTimeArr){
            allTimeArr[index] && allTimeArr[index].forEach(v=>{
                if(v){
                    let key = `${v['time_slot_fr']} - ${v['time_slot_to']}`;
                    if(!tempObj[key]) tempObj[key] = { count:0 };
                    if(index==0){
                        tempObj[key] = {
                            ...tempObj[key],
                            count:tempObj[key]['count'] + 1,
                            ...v,
                            INST:v
                        }
                    }
                    if(index==1){
                        tempObj[key] = {
                            ...tempObj[key],
                            count:tempObj[key]['count'] + 1,
                            ...v,
                            MAIN:v
                        }
                    }
                    if(index==2){
                        tempObj[key] = {
                            ...tempObj[key],
                            count:tempObj[key]['count'] + 1,
                            ...v,
                            SH:v
                        }
                    }
                }
            })
        }
        let resultArr = [];
        for(let key in tempObj){
            if(tempObj[key]["count"] === FLAG_COUNT) resultArr.push(tempObj[key]);
        } 
        return resultArr;
    }catch(err){
        throw new Error(err);
    }
}


export const getNewCpeQuotaAvailDate = async({orderAction,orderType, target_month,address_code}) => {
    // orderAction:INST/MAIN
    // orderType:FTNS/SMART-HOME
    try{
        let path = C.API.CPE_QUOTA_API + '/cpe-quota-avail-date';
        let payload = {
            address_code:address_code,
            company:'HKBN',
            customer_type:'NORMAL',
            order_action:orderAction,
            order_type:orderType,
            platform:'RET2019_CPM',
            requestor_ref_no:window.salesCode,
            requestor_type:'SALES',
            schedule_type:'SCH',
            target_month,
            // BMO SITE TEST CODE
            // address_code:'6265',
            // company:'HKBN',
            // customer_type:'NORMAL',
            // order_action:'INST',
            // order_type:'FTNS',
            // platform:'RET2019_CPM',
            // requestor_ref_no:window.salesCode,
            // requestor_type:'SALES',
            // schedule_type:'SCH',
            // target_month:'202008',
        }
    let res = await ajax.get(path,{headers:payload});
    if(res.data['status']=="1") return res.data['quota_avail_list'];
    throw new Error(res.data.message)
    }catch(err){
        throw new Error(err);
    }
}

export const getNewCpeQuotaAvailDateArr = (cpeQuotaControl,target_month) => async(dispatch, getState)=>{
    let rootState = getState();
    const {step1} = rootState;
    let address_code = null;
    try{
        if(step1.step1UI.services[0]){
            address_code = step1.step1UI.services[0].serviceAddr.addrCode
        }else{
            throw new Error('客戶不存在Address Code,無法選擇安裝日期')
        }
        const {isInstallQuota,installCpeOrderType,isMaintQuota,maintOrderType,isShQuota,shCpeOrderType} = cpeQuotaControl;
        const FLAG_COUNT = ~~isInstallQuota  + ~~isMaintQuota + ~~isShQuota;
        let promiseArr = [];
        if(isInstallQuota){
            promiseArr[0]= getNewCpeQuotaAvailDate({orderAction:'INST',orderType:installCpeOrderType,target_month,address_code})
        }
        if(isMaintQuota)  promiseArr[1] =getNewCpeQuotaAvailDate({orderAction:'MAIN',orderType:maintOrderType,target_month,address_code})
        if(isShQuota) promiseArr[2] = getNewCpeQuotaAvailDate({orderAction:'INST',orderType:shCpeOrderType,target_month,address_code});
        // index 0為INST 1為MAINT 2為SH
        const allTimeArr = await Promise.all(promiseArr);
        let tempObj = {};
        for(let value in allTimeArr){
            allTimeArr[value] && allTimeArr[value].forEach(v=>{
                tempObj[v['quota_date']] = (~~tempObj[v['quota_date']]) + 1;
            })
        }
        let resultArr = [];
        for(let key in tempObj){
            if(tempObj[key]===FLAG_COUNT) resultArr.push({quota_date:key});
        } 
        return resultArr;
    }catch(err){
        throw new Error(err);
    }
}

export const newCpeReserveQuota = (quotaRef) => (dispatch, getState) => {
    let path = C.API.CPE_QUOTA_API + '/reserve-quota'; 
    let rootState = getState();
    const {step1} = rootState;
    const address_code = step1.step1UI.services[0].serviceAddr.addrCode; 
    let payload ={
        "address_code": address_code,
        "platform": "RET2019_CPM",
        "quota_ref": quotaRef,
        "requester_ref_no": window.salesCode,
        "requester_type": 'SALES'
      }
      return ajax.post(path,payload)
      .then(r =>{
          return r.data;
      })
}

export const saveCpeTimeObj = (obj) => (dispatch,getState) =>{
    dispatch({
        type:C.STEP3_PUSH_CPE_TIME_OBJ,
        data:obj
    })
}

export const saveMaintTimeObj = (obj) => (dispatch,getState) =>{
    dispatch({
        type:C.STEP3_PUSH_MAINT_TIME_OBJ,
        data:obj
    })
}



// Case No.	Case	Manually / Auto V1	Combin (Y/N)	Quota type
// Case 1	BN CHG + HT INST	Installation_Quota (NH/IH Auto V1)	N	NON-FTNS
// Case 2	BN CHG + HT INST + Smart home INST	Installation_Quota (NH/IH & SH Auto V1)	Y (HT+SH)	NON-FTNS
// Case 3	BN CHG + Smart home INST	XE_Quota (SH Auto V1)	N	SMH-INST
// Case 4	BN UPG (pre-reg)	Installation_Quota (Manually V1)	N	FTNS
// Case 5	BN UPG (pre-reg) + HT INST	Installation_Quota (Manually V1)	Y (BN+HT)	FTNS
// Case 6	BN UPG (pre-reg) + HT INST + Smart home INST	Installation_Quota (Manually V1) + XE_Quota (SH Auto V1)	Y (BN+HT)	FTNS
// Case 7	BN UPG (pre-reg) + Smart home INST	Installation_Quota (Manually V1) + XE_Quota (SH Auto V1)	N	FTNS
// Case 8	BN UPG (maint)	Maint_Quota (Manually V1)	N	MAINT
// Case 9a	BN UPG (maint) + HT INST	Maint_Quota (Manually V1) + Installation_Quota (NH/IH Auto V1)	N	MAINT + NON-FTNS
// Case 9b	BN UPG (maint) + HT INST (IAD/BNP)	Maint_Quota (Manually V1) + Installation_Quota (Manually V1)	N	MAINT + FTNS
// Case 10	BN UPG (maint) + HT INST + Smart home INST	Maint_Quota (Manually V1) + Installation_Quota (NH/IH & SH Auto V1)	Y (HT+SH)	MAINT + NON-FTNS
// Case 11	BN UPG (maint) + Smart home INST	Maint_Quota (Manually V1) + XE_Quota (SH Auto V1)	N	MAINT + SMH-INST
// Case 12	MS CHG + Smart home INST	XE_Quota (SH Auto V1)	N	SMH-INST
// Case 13	HT UPG (maint)	Maint_Quota (Manually V1)	N	HT MAINT
// Case 14	BN CHG + HT UPG (maint)	Maint_Quota (Manually V1)	N	HT MAINT
// Case 15	BN CHG + HT UPG (maint) + Smart home INST	Maint_Quota (Manually V1) + XE_Quota (SH Auto V1)	N	HT MAINT+ SMH-INST
// Case 16	BN UPG (pre-reg) + HT UPG (maint)	Installation_Quota (Manually V1) + Maint_Quota (Manually V1)	N	FTNS + HT MAINT
// Case 17	BN UPG (pre-reg) + HT UPG (maint) + Smart home INST	Installation_Quota (Manually V1) + Maint_Quota (Manually V1) + XE_Quota (SH Auto V1)	N	FTNS + HT MAINT+ SMH-INST
// Case 18	BN UPG (maint) + HT UPG (maint)	BN Maint_Quota (Manually V1) + HT Maint_Quota (Manually V1)	N	MAINT+ HT MAINT
// Case 19 	BN UPG (maint) + HT UPG (maint) + Smart home INST	BN Maint_Quota (Manually V1) + HT Maint_Quota (Manually V1) + XE_Quota (SH Auto V1)	N	MAINT+ HT MAINT+ SMH-INST


// TODO: 先做CASE 1-12
export const checkCpeQuotaTimeObjFn = ()=> (dispatch,getState) =>{
    const rootState = getState();
    const {step3} = rootState; 
    const {BN_CHG,BN_MAINT,BN_UPGRADE,HT_INST} = chkNeedInstallQuota(rootState);
    const {isShQuota,shCpeTimeobj} = chkSmartHomeQuota(rootState);
    console.log('BN_CHG,BN_MAINT,BN_UPGRADE,HT_INST,isShQuota');
    console.log(BN_CHG,BN_MAINT,BN_UPGRADE,HT_INST,isShQuota);
    let obj = {
        isInstallQuota:false,
        installCpeTimeObj:undefined,
        installCpeOrderType:'FTNS',
        isMaintQuota:false,
        maintOrderType:'FTNS',
        maintCpeTimeObj:undefined,
        isShQuota:false, // smartHome
        shCpeTimeobj:undefined,
        shCpeOrderType:'SMART-HOME',
        HT_INST,
        SH_INST:isShQuota,
        BN_CHG,
        BN_MAINT,
        BN_UPGRADE
    }

    // suport
    // BN CHG + HT INST
    // BN CHG + HT INST + Smart home INST
    if(BN_CHG && HT_INST){
        obj['isInstallQuota'] = true;
        obj['installCpeTimeObj'] = step3.step3UI.cpeTimeObj;
        // case 1 case2
        obj['installCpeOrderType'] = 'NON-FTNS';
        dispatch({
            type:C.STEP3_CPE_QUOTA_CONTROL,
            data:obj
        });
        return obj;
    }

    // support
    // BN CHG + Smart home INST
    if(BN_CHG && !HT_INST && isShQuota){
        obj['isShQuota'] = true;
        obj['shCpeTimeobj'] = shCpeTimeobj;
        // case 3
        obj['shCpeOrderType'] = 'SMART-HOME';
        dispatch({
            type:C.STEP3_CPE_QUOTA_CONTROL,
            data:obj
        });
        return obj;
    }


    // support 
    // BN UPG (pre-reg)
    // BN UPG (pre-reg) + HT INST
    // BN UPG (pre-reg) + HT INST + Smart home INST
    if(BN_UPGRADE && !BN_MAINT){
        obj['isInstallQuota'] = true;
        obj['installCpeTimeObj'] = step3.step3UI.cpeTimeObj;
        // case4 5 6 7
        obj['installCpeOrderType'] = 'FTNS';
        // BN UPG (pre-reg) + Smart home INST
        if(!HT_INST && isShQuota){
            obj['isShQuota'] = true;
            obj['shCpeTimeobj'] = shCpeTimeobj;
            // case 7
            obj['shCpeOrderType'] = 'SMART-HOME';
        }
        dispatch({
            type:C.STEP3_CPE_QUOTA_CONTROL,
            data:obj
        });
        return obj;
    }

    // support 
    // BN UPG (maint)
    if(BN_MAINT){
        obj['isMaintQuota'] = true;
        obj['maintCpeTimeObj'] = step3.step3UI.maintTimeObj;
        obj['maintOrderType'] = 'FTNS';
        // BN UPG (maint) + HT INST
        // BN UPG (maint) + HT INST + Smart home INST
        if(HT_INST){
            obj['isInstallQuota'] = true;
            obj['installCpeTimeObj'] = step3.step3UI.cpeTimeObj;
            // case 9a 10
            obj['installCpeOrderType'] = 'NON-FTNS';
        }
        // BN UPG (maint) + Smart home INST
        if(!HT_INST && isShQuota){
            obj['isShQuota'] = true;
            obj['shCpeTimeobj'] = shCpeTimeobj;
            // case 11
            obj['shCpeOrderType'] = 'SMART-HOME';
        }
        dispatch({
            type:C.STEP3_CPE_QUOTA_CONTROL,
            data:obj
        });
        return obj;
    }

    // todo: 好似無下面的CASE
    // HT INST
    // HT INST + SMART HOME INST
    if(!BN_CHG && !BN_MAINT && !BN_UPGRADE && HT_INST){
        obj['isInstallQuota'] = true;
        obj['installCpeTimeObj'] = step3.step3UI.cpeTimeObj;
        // case 9a 10
        obj['installCpeOrderType'] = 'NON-FTNS';
        dispatch({
            type:C.STEP3_CPE_QUOTA_CONTROL,
            data:obj
        });
        return obj;
    }


    // just upsell smart home
    if(isShQuota){
        obj['isShQuota'] = true;
        obj['shCpeTimeobj'] = shCpeTimeobj;
        // case 11
        obj['shCpeOrderType'] = 'SMART-HOME';
    }

    // default
    dispatch({
        type:C.STEP3_CPE_QUOTA_CONTROL,
        data:obj
    })
    return obj;   
   
}


// copy form Step3 chkNeedCpeQuota
export const chkNeedInstallQuota =(props)=>{
    let selectedPlan = props.step1.step1UI.splans;
    let retPlan = props.step3.step3UI.retPlan;
    let upsellPlan = props.step3.step3UI.upsellPlan;
    let oldBnPortType = '';
    let isNeedCpeQuotaObj = {
        BN_CHG:false,
        BN_MAINT:false,
        BN_UPGRADE:false,
        HT_INST:false,
    }

    for (const key of Object.keys(selectedPlan)) {
        let currentObj = selectedPlan[key];

        if (currentObj.service_type == 'AS'){ 
            oldBnPortType = currentObj.setting; 
        }
    }

    if ('asPlan' in retPlan) {
        if ('BN' in retPlan.asPlan.subService) {
            let newBnPortType = retPlan.asPlan.subService.BN.portType;

            console.log(newBnPortType,oldBnPortType);
            console.log(retPlan.asPlan);
            // TODO：
            // if (newBnPortType.substring(0,1) !== oldBnPortType.substring(0,1)) {
            //     // UPG
            //     isNeedCpeQuotaObj['BN_CHG'] = true;
            // }
            if (retPlan.asPlan.isMaint) {
                // Maint Or upgrade
                isNeedCpeQuotaObj['BN_MAINT'] = true;
            }
            if(retPlan.asPlan.isUpgrade){
                isNeedCpeQuotaObj['BN_UPGRADE'] = true;
            }
            if(!retPlan.asPlan.isMaint && !retPlan.asPlan.isUpgrade){
                isNeedCpeQuotaObj['BN_CHG'] = true;
            }
        }
    }
    // TODO: [上午11:03] Don Tsang:暫時不會有
    // if ('asPlan' in upsellPlan) {
        // isNeedCpeQuota = true;
    // }

    if ('cmPlan' in upsellPlan) {
        // HT INST
        if ('HT' in upsellPlan.cmPlan.subService) {
            isNeedCpeQuotaObj['HT_INST'] = true;
        }
    }

    return isNeedCpeQuotaObj;
}

// XE-MESH 要跟埋SH QUOTA
export const chkSmartHomeQuota = (props)=>{
    let upsellPlan = props.step3.step3UI.upsellPlan;
    if ('xePlan' in upsellPlan) {
        for (let plan of upsellPlan.xePlan) {
            if(plan['subService']['SH']){
                if(plan['subService']['SH']['smartHomeData']['isSelectedCpeOffer']){
                    return {
                        shCpeTimeobj:props.step3.smartHomeCpeTimeObj,
                        isShQuota:true,
                    }
                }
            }
            if(plan['subService']['MESH']){
                return {
                    shCpeTimeobj:props.step3.smartHomeCpeTimeObj,
                    isShQuota:true,
                }
            }
        }
    }
    
    return {
        shCpeTimeobj:undefined,
        isShQuota:false,
    };
}
export const saveShCpeTimeObj = (obj) => (dispatch,getState) =>{
    dispatch({
        type:C.STEP3_PUSH_SH_CPE_TIME_OBJ,
        data:obj
    })
}
export const chkUsedQuotaSub = (campaignOffer)=> async(dispatch, getState) => {

    console.log(campaignOffer); 
    let path =  C.API.RET_SERVICE_API + '/campaign/chk-used-quota-sub';
    try{
        let res = await ajax.get(path, {
            headers:{
                campaignType:campaignOffer['campaignType'],
                campaignCode:campaignOffer['offerCampaignCode'],
                ruleType:campaignOffer['offerRuleType1'],
                ruleCode:campaignOffer['offerRuleCode1'],
            }
        })
        console.log(res.data)
        if(res.data['valid'] == 'Y') return true;
        return false;
    }catch(err){

    }
}
export const getBusinessDate = (leseDaysQuota)=> async(dispatch, getState) => {
    try{
        let path =  C.API.UTIL_API + '/businessService/getBusinessDate';

        let res = await ajax.get(path,{
            headers:{
                startDate:moment().format('YYYYMMDD'),
                extraDays:leseDaysQuota
            }
        })
        console.log(res);
        if(res.data && res.data['targetDate']){
            dispatch({
                type:C.STEP3_SAVE_LEASE_INSTALL_DATE,
                date:res.data['targetDate']
            })
        }
    }catch(err){
        throw new Error(err);
    }
}




export const checkDnOwnerOperator = (dn,type) => async (dispatch, getState) => {
    try{
        let path =  C.API.EXP_1M_MENU;
        let headers = {
            'client_id':0,
            'client_secret':0,
            'x-correlation-id':0,
            'source-id':0
        }

        if(API_ENV == 'PROD'){
            headers['client_id'] = '549f340e851c4ba4acd5abb629d81fc5'
            headers['client_secret'] = '95D25Ef1A78C4cC7Bf32d867E2461A50'
        }

        if(API_ENV == 'UAT'){
            headers['client_id'] = 'a5416339e5e94975aa4f38b0812ebd1e'
            headers['client_secret'] = '9FfF46C4746c4040973abD487E9B796c '
        }

        let res = await ajax.get(path,{
            headers,
            params:{dn}
        })
        if(res.status == 200){
            let data = res.data
            if(data.portingOperator && data.portingOperator.messagePayload && data.portingOperator.messagePayload.dno == type){
                return true
            }else{
                return false
            }
        }
    }catch(err){
        throw new Error(err);
    }
};

export const checkUpsellMiniPkgDedupWithFuturePlans = (upsellPlans,futurePlans) => async (dispatch, getState) => {
    let path = C.API.RSM_MIDDLEWARE_API + '/mini-pkg/compare-channel-dedup'
    return await ajax.get(path,{params:{
        upsellPlans,
        futurePlans
    }})
}



/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
    let stack =[S[0]];
    for(let i=1;i<S.length;i++){
        let sLast = stack.length - 1;
        let cur  = S[i];
        if(stack[sLast] === cur){
            stack.pop();
        }else{
            stack.push(cur);
        }
    }
    return stack.join('');
};


var removeDuplicates = function(S) {
    regex = /(\w)\1/g;
    while (regex.test(S)){
        S = S.replace(regex, '');
    };
    return S;
}


/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(!root) return 0;
    let count = 0; 
    for (let child of root.children) {
        count = Math.max(count, maxDepth(child));
    }
    return 1 + count ;
};
