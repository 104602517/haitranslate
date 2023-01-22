import authority from './authority';
import rechargeMerchantSet from './rechargeMerchantSet';
import withdrawPayment from './withdrawPayment';
import modules from './modules';
import models from './models';
import rechargeRecord from './rechargeRecord';
import data from './data';
import financialManagement from './financialManagement';
import fundAdjustment from './fundAdjustment';
import login from './login';
import memberLoginLog from './memberLoginLog';
import operationManagement from './operationManagement';
import proxyDomain from './proxyDomain';
import reportCenter from './reportCenter';
import riskControl from './riskControl';
import silentMember from './silentMember';
import stationLetter from './stationLetter';
import deviantLog from './deviantLog';
import memberList from './memberList';
import agentList from './agentList';
import constant from './constant';

export default Object.assign(
  {},
  {
    agentList,
    memberList,
    deviantLog,
    stationLetter,
    silentMember,
    riskControl,
    reportCenter,
    proxyDomain,
    operationManagement,
    memberLoginLog,
    login,
    fundAdjustment,
    financialManagement,
    authority,
    data,
    constant,
    rechargeRecord,
    models,
    modules,
    withdrawPayment,
    rechargeMerchantSet,
  },
);
