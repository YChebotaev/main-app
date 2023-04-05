import {showFieldError} from "./form.js";

/**
 * Отправка запроса на сервер.
 * @param url
 * @param method
 * @param data
 * @param result_container
 * @param success_handle
 * @param enable_preloader
 * @param button_identifier
 * @param has_file
 * @param resultContainerForClear
 * @param form
 */
export function sendRequest({
                                url,
                                method,
                                data,
                                result_container,
                                success_handle,
                                enable_preloader,
                                button_identifier,
                                has_file = false,
                                resultContainerForClear,
                                form
}) {

    if(enable_preloader === undefined) {
        enable_preloader = true;
    }

    clearFields();

    $(result_container).html('');

    if (resultContainerForClear) {
        $(resultContainerForClear).html('');
    }

    /**
     * Добавления токена.
     */
    try {
        if (['POST', 'post', 'DELETE', 'delete', 'PUT', 'put'].indexOf(method) >= 0 && window.token && !data._token) {
            if (Array.isArray(data)) {
                data.push({name: "_token", value: window.token});
            } else {
                data._token = window.token;
            }
        }
    } catch (e) {
        console.warn(e);
    }

    let ajax_setup = {
        url: url,
        type: method,
        data: data,

        success: function (data) {

            preloader(false, result_container, button_identifier);

            if(data.operation_status !== undefined) {

                if (data.operation_status.status === 'success') {

                    if(success_handle) {
                        success_handle(data);
                    }

                    hideConfirmPopup(button_identifier, true, result_container);

                } else {
                    viewErrorResult(data, result_container);
                    hideConfirmPopup(button_identifier, false, result_container);
                }

            } else {
                viewErrorResult(data, result_container);
                hideConfirmPopup(button_identifier, false, result_container);
            }

        },

        error: function (xhr, status, error) {
            preloader(false, result_container, button_identifier);
            form && viewErrors(xhr.responseJSON, form);
            viewErrorResult(xhr.responseJSON, result_container);
            hideConfirmPopup(button_identifier, false, result_container);
        },

        fail: function () {
            preloader(false, result_container, button_identifier);
            viewError(result_container, 'При запросе произошла фатальная ошибка на сервере');
            hideConfirmPopup(button_identifier, false, result_container);
        },

        beforeSend: function() {
            if(enable_preloader) preloader(true, result_container, button_identifier);
        }
    };

    if(has_file) {
        ajax_setup['processData'] = false;
        ajax_setup['contentType'] = false;
    }

    return $.ajax(ajax_setup);
}

/**
 * Вывод ошибок.
 * @param data
 * @param form
 */
function viewErrors(data, form) {
    $.each(data['validation_errors'], function( index, value ) {
        showFieldError($("[name='"+index+"']", form), value[0]);
    });
}

/**
 * Вывод успешного ответа.
 * @param message
 * @param result_container
 */
function viewSuccessResult(message, result_container) {
    viewSuccess(result_container, message);
}

/**
 * Вывод ошибок.
 * @param data
 * @param result_container
 */
function viewErrorResult(data, result_container) {

    let message = '';

    if(data.operation_status !== undefined) {
        if (data.operation_status.status === 'error') {
            message = data.operation_status.message + "<br>";
        }
    }

    $.each(data['errors'], function( index, value ) {
        message += value + "<br>";
    });

    if (message === '') {
        message = 'При запросе произошла фатальная ошибка на сервере';
    }

    viewError(result_container, message);
}

/**
 * Очистка полей.
 */
function clearFields() {
    $('.error-text').html('');
    $('.field-error').removeClass('field-error');
    $('.field-info').removeClass('field-info')
}

/**
 * Вывод сообщения об ошибки.
 * @param alert
 * @param message
 */
export function viewError(alert, message) {
    // $(alert).html("<div class=\"alert alert-danger error-text\">"+message+"</div>").fadeIn();
    $(alert).html("<div class=\"u-error u-error_center u-error_mb_10\">"+message+"</div>").fadeIn();
}

/**
 * Вывод сообщения об успешной операции.
 * @param alert
 * @param message
 */
function viewSuccess(alert, message) {
    // $(alert).html("<div class=\"alert alert-success u-success-text\">"+message+"</div>").fadeIn();
    $(alert).html("<div class=\"u-success u-success_center u-success_mb_10\">"+message+"</div>").fadeIn();
}

/**
 * Прелоадер в виде анимации точек на кнопке.
 */
export let ButtonPreloader = {

    /**
     * Хранение текста кнопок для восстановления.
     */
    buttons: [],

    /**
     * Вывод прелоадера.
     * @param button_identifier
     */
    showPreloader: function (button_identifier) {

        let btn = $(button_identifier);

        btn.css('pointer-events', 'none');

        // this.buttons[button_identifier] = btn.html();
        //
        // btn.html(
        //     `<div class="wrapper-preloader">
        //         <div class="circle circle-1"></div>
        //         <div class="circle circle-1a"></div>
        //         <!-- <div class="circle circle-2"></div>-->
        //         <div class="circle circle-3"></div>
        //     </div>`
        // );
        Button.enableLoading(btn.get(0))
    },

    /**
     * Скрытие прелоадера.
     * @param button_identifier
     */
    hidePreloader: function (button_identifier) {

        let btn = $(button_identifier);

        btn.css('pointer-events', 'auto');

        // btn.html(this.buttons[button_identifier]);
        //
        // this.buttons.splice(button_identifier, 1);
        Button.disableLoading(btn.get(0))
    },

};

/**
 * Управление прелоадером при отправке запроса.
 * @param show
 * @param container
 * @param button_identifier
 */
function preloader(show, container, button_identifier) {

    /**
     * Если прелоадер в виде кнопки отправки формы.
     */
    if(button_identifier !== undefined) {

        if(show) {
            ButtonPreloader.showPreloader(button_identifier);
        } else {
            ButtonPreloader.hidePreloader(button_identifier);
        }

    } else {

        if(show) {
            $(container).html("<div class=\"alert alert-primary\">Запрос выполняется...</div>")
        } else {
            $(container).html('');
        }

    }

}

/**
 * Скрытие попапа подтверждения после выполнения операции.
 */
function hideConfirmPopup(button_identifier, operation_success, result_container) {

    /**
     * Если передан идентификатор кнопки и установлен флаг.
     */
    if(button_identifier && $(button_identifier).hasClass('confirm-true') && window.close_popup_after_action) {

        /**
         * Если операция выполненна успешно или контейнер для результата расположен не на попапе подтверждения.
         */
        if(operation_success || !$(result_container).hasClass('confirm-status')) {
            setTimeout(function () {
                $.magnificPopup.close();
            })
        }

    }

}

/**
 * Получение GET параметра запроса.
 * @param key
 * @returns {any}
 */
export function getRequestParameter(key) {
    let p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? decodeURIComponent(p[1]) : false;
}
