import moment from 'moment';

const momentService = {};
momentService.format = {
  day  : 'dddd', // Monday
  short: 'll', // 28 de oct. de 2016 ,
  full : 'llll' // mar, 1 de nov. de 2016, 13:47
};
moment.locale('es');

export default momentService;
