function formatarMilisegundosComLegenda(duration) {
    // Converter milisegundos para segundos;
    duration = duration / 1000;

    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like '1:01' or '4:03:59' or '123:03:59'
    var ret = '';

    if (hrs > 0) {
        ret += '' + hrs + ' h ' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ' min ' + (secs < 10 ? '0' : '');
    ret += '' + secs + ' seg ';
    return ret;
}

export default formatarMilisegundosComLegenda;