
 Ejemplo de como lo utilizo:

$.each($(":input[required]"), function(index, element) {
    var target = $(element);
    CheckRequired(target);
    CheckControlValue(target);
});



//target tiene que ser un objeto jQuery $()
function CheckRequired(target) {
    if (target.attr("required") == "required") {
        if (target.val() == "" || target.val() == "0") {
            TagError(false, target, "Este campo es Requerido", "req_");
        } else {
            TagError(true, target, "", "req_");
        }
    }
}

//target tiene que ser un objeto jQuery $()
function CheckControlValue(target) {
    var message;
    var isValid = false;
    if (target.attr("validacion") != undefined) {
        switch (target.attr("validacion").toLowerCase()) {
            case "date":
                isValid = validaFecha(target.val());
                message = "La fecha es invalida";
                break;
            case "hour":
                isValid = validaHora(target.val());
                message = "La hora es invalida";
                break;
            case "selector":
                if (target.val() != "0" && target.val() != "")
                    isValid = true;
                message = "Debe selecionar un valor";
                break;
            case "matricula":
                isValid = validaMatricula(target.val());
                message = "la matricula no tiene el formato correcto";
                break;
            case "text":
                isValid = validaText(target.val(), target.attr("MinLength"));
                message = "";
                break;
            case "number":
                isValid = true;
                //validaNumero(target.val());
                message = "Por favor, solo introduzca valores numericos"
        }

        TagError(isValid, target, message, "val_");
    }
}

function TagError(isValid, target, message, tag) {
    target.attr("valid", isValid.toString());
    var idMessageControl = target.attr("id");

    if (isValid) {
        $("#" + tag + idMessageControl).remove();
    } else {
        if ($("#" + tag + idMessageControl).length == 0) {
            target.after('<label id="' + tag + idMessageControl + '" class="ui-state-error" >' + message + '</label>');
        }
    }
}

function validaMatricula(sMatricula) {
    var matricula = sMatricula.toUpperCase();
    var reg = new RegExp(/(^[A-Z]{1,3}(-| )?\d{4}(-| )?[A-Z]{1,3}$)|(^\d{4}(-| )?[A-Z]{3}$)/i);
    return reg.test(matricula);
}

function validaHora(sHora) {
    var reg = new RegExp(/(^([01]\d|2[0-3]):?([0-5]\d)$)/i);
    return reg.test(sHora);
}

function validaFecha(sFecha) {
    var isValid = true;
    var bits = sFecha.split('/');
    //Comprobar que no hay ningun bit vacio
    $.each(bits, function(intex, element) {
        if (element == "") {
            isValid = false;
        }
    });
    if (!isValid) {
        return isValid;
    }
    //comprobar que se puede crear la fecha correctamente !!!!Acepta vacios¡¡¡¡
    var d = new Date(bits[2] + '/' + bits[1] + '/' + bits[0]);
    isValid = !!(d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]));

    //comprobar que el valor de fecha no es mayor a hoy
    var today = new Date();
    if (d > today) {
        isValid = false;
    }

    return isValid
}

function validaText(sTexto, minLength) {
    if (sTexto.length < minLength) {
        return false;
    } else {
        return true;
    }
}

function AllowOnlyNumbers(e) {
    var permis = [46, 9, 27, 13, 188, 46, 8];
    if ($.inArray(e.keyCode, permis) !== -1 ||
    // Permite: home, end, left, right, down, up, comma
            (e.keyCode >= 35 && e.keyCode <= 40) ||
    //Finalmente permitimos los numeros
                (e.keyCode >= 48 && e.keyCode <= 57)
            ) {
        return true;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
    e.preventDefault();
}
