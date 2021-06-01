export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
};

export const firstLetterHandler = user => {
    return (user) ? user.charAt(0).toUpperCase() : null;
}

export const toFirstCharUppercase = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getFirst100Char = text => {
    return (text) ? (((text).length < 100) ? text : text.slice(0, 95) + "...") : null;
}

export const getFirst40Char = text => {
    return (text) ? (((text).length < 40) ? text : text.slice(0, 37) + "...") : null;
}

export const formatDateCustomFunc = date => {
    let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let month = monthNames[date.getMonth()];
    let day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    let newDate = month + '\n' + day + ', ' + year
    return newDate;
};

export const getSnackbarData = (message, variant) => {
    return {
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: variant,
            action: null,
        },
    };
};