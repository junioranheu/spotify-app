import Moment from 'moment-timezone';

export default function HorarioBrasilia() {
    const timezone = 'America/Sao_Paulo';
    Moment.tz.setDefault(timezone);
    // const horarioBrasilia = Moment().add(3, 'hours');
    const horarioBrasilia = Moment();
    
    return horarioBrasilia;
}
