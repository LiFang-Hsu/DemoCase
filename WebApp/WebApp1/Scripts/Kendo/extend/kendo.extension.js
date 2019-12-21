(function () {
    var dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|zzz|zz|z|"[^"]*"|'[^']*'/g, objectToString = {}.toString, zeros = [
        '',
        '0',
        '00',
        '000',
        '0000'
    ];
    function pad(number, digits, end) {
        number = number + '';
        digits = digits || 2;
        end = digits - number.length;
        if (end) {
            return zeros[digits].substring(0, end) + number;
        }
        return number;
    }
    function formatTWDate(date, format, culture) {
        if (objectToString.call(date) !== '[object Date]') return date !== undefined ? date : '';
        culture = kendo.getCulture(culture);
        var calendar = culture.calendars.standard, days = calendar.days, months = calendar.months;
        format = calendar.patterns[format] || format;
        return format.replace(dateFormatRegExp, function (match) {
            var minutes;
            var result;
            var sign;
            if (match === 'd') {
                result = date.getDate();
            } else if (match === 'dd') {
                result = pad(date.getDate());
            } else if (match === 'ddd') {
                result = days.namesAbbr[date.getDay()];
            } else if (match === 'dddd') {
                result = days.names[date.getDay()];
            } else if (match === 'M') {
                result = date.getMonth() + 1;
            } else if (match === 'MM') {
                result = pad(date.getMonth() + 1);
            } else if (match === 'MMM') {
                result = months.namesAbbr[date.getMonth()];
            } else if (match === 'MMMM') {
                result = months.names[date.getMonth()];
            } else if (match === 'yy') {
                result = pad(date.getFullYear() % 100);
            } else if (match === 'yyyy') {
                result = pad(date.getFullYear() - 1911, 3, '0');
            } else if (match === 'h') {
                result = date.getHours() % 12 || 12;
            } else if (match === 'hh') {
                result = pad(date.getHours() % 12 || 12);
            } else if (match === 'H') {
                result = date.getHours();
            } else if (match === 'HH') {
                result = pad(date.getHours());
            } else if (match === 'm') {
                result = date.getMinutes();
            } else if (match === 'mm') {
                result = pad(date.getMinutes());
            } else if (match === 's') {
                result = date.getSeconds();
            } else if (match === 'ss') {
                result = pad(date.getSeconds());
            } else if (match === 'f') {
                result = math.floor(date.getMilliseconds() / 100);
            } else if (match === 'ff') {
                result = date.getMilliseconds();
                if (result > 99) {
                    result = math.floor(result / 10);
                }
                result = pad(result);
            } else if (match === 'fff') {
                result = pad(date.getMilliseconds(), 3);
            } else if (match === 'tt') {
                result = date.getHours() < 12 ? calendar.AM[0] : calendar.PM[0];
            } else if (match === 'zzz') {
                minutes = date.getTimezoneOffset();
                sign = minutes < 0;
                result = math.abs(minutes / 60).toString().split('.')[0];
                minutes = math.abs(minutes) - result * 60;
                result = (sign ? '+' : '-') + pad(result);
                result += ':' + pad(minutes);
            } else if (match === 'zz' || match === 'z') {
                result = date.getTimezoneOffset() / 60;
                sign = result < 0;
                result = math.abs(result).toString().split('.')[0];
                result = (sign ? '+' : '-') + (match === 'zz' ? pad(result) : result);
            }
            return result !== undefined ? result : match.slice(1, match.length - 1);
        });
    }

    function TWDateToADDate(value) {
        if (objectToString.call(value) === "[object String]" && value.length >= 3) {
            var val = value.split('/');
            var year = parseInt(val[0]);
            if (!isNaN(year) && year < 1911) {
                year += 1911;
                val[0] = year.toString();
                value = val.join('/');
            }
        }
        return value;
    }

    kendo.formatTWDate = formatTWDate;
    kendo.TWDateToADDate = TWDateToADDate;
}());

