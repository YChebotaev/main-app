/**
 * Проверка полей на пустоту и уменьше лейбла при заполненном поле.
 */
export function checkNotEmptyFields() {

    $(".field-input, .field-textarea").each(function(id, element){
        if ($(element).val() !== '') {
            $(element).parent('.field').addClass('field-not-empty');
        }
    });
}

/**
 *  Уменьшение label и удаление ошибок у поля.
 */
export function focusedOnField() {
    $(this).parent('.field')
        .addClass('field-focused field-not-empty')
        .removeClass('field-error')
        .find('.error-text')
        .addClass('u-hide');
}

/**
 * Проверка валидности email.
 *
 * @param email
 * @returns {boolean}
 */
export function checkEmail(email) {
    let pattern = /^([a-z0-9_\.\-\+])+@[a-z0-9-]+\.([a-z0-9]{2,}\.)?[a-z]{2,4}$/i;
    return pattern.test(email);
}

/**
 * Проверка валидности телефона.
 *
 * @param phone
 * @returns {boolean}
 */
export function checkPhone(phone) {
    let pattern = /^[+]\d{5,}$/i;
    return pattern.test(phone);
}

/**
 * Получение стандартного номера телефона из произвольного формата.
 * @param phone
 */
export function getStandardPhone(phone) {

    if(phone.length === 0) {
        return phone;
    }

    phone = phone.replace(/[^0-9]/g, '', phone);

    if(phone === '') return '';

    if(phone[0] !== '+') {
        phone = '+'+phone;
    }

    if(phone[1] === '8') {
        phone = '+7'+phone.slice(2);
    }

    return phone;
}

/**
 * Отображение ошибки поля.
 *
 * @param field
 * @param message
 */
export const showFieldError = (field, message) => {
    // const errorSelector = $(field).siblings('.t-input-error');
    // errorSelector.html(message).show();

    const errorSelector = $(field.parent().parent());

    $('.u-error', errorSelector).html(message).show();
};
//
// /**
//  * Вывод ошибки для поля формы.
//  *
//  * @param element
//  * @param error
//  */
// export function showFieldError(element, error) {
//     //
//     // element = $(element);
//     //
//     // if(element.hasClass('field-input')) {
//     //
//     //     let block = $(element).parent(),
//     //         error_block = block.find('.error-text');
//     //
//     //     error_block.text(error);
//     //
//     //     /**
//     //      * Если 2 строки ошибки, увеличение отступов для ошибки
//     //      */
//     //     if (error_block.height() >= 26) {
//     //         block.addClass('big-error');
//     //         error_block.addClass('big-error');
//     //     }
//     //
//     //     error_block.removeClass('u-hide');
//     //
//     //     block.addClass('field-error');
//     //
//     // } else {
//     //
//     //     let error_container = element.parent().find('.error-text');
//     //
//     //     if(error_container.length === 0) {
//     //         error_container = element.closest('.field').find('.error-text');
//     //     }
//     //
//     //     error_container.text(error);
//     //     error_container.removeClass('u-hide');
//     //
//     // }
//
// }

/**
 * Скрытие ошибок для полей формы.
 */
export function hideFieldsErrors() {
    $('.Success, #systemError, .result').fadeOut();
    $('.error-text').removeClass('u-hide');
    $('.error-text.big-error').removeClass('big-error');
    $('.field').removeClass('field-error').removeClass('big-error');
}

/**
 * Вывод результата операции.
 *
 * @param result_container
 * @param text
 * @param is_error
 */
export function showFormResult(result_container, text, is_error) {
    $(result_container).html('<div class="alert '+(is_error ? 'alert-danger error-text' : 'alert-success u-success-text')+'">'+text+'</div>').fadeIn();
}

/**
 * Вывод информационного сообщения под полем.
 *
 * @param identifier - id поля
 * @param message
 */
export function showFieldInfo(identifier, message) {
    let block = $(identifier).parent();
    let error_block = block.find('.error-text');

    error_block.html('<span class="info">' + message + '</span>').removeClass('u-hide');
    block.addClass('field-info');
}

/**
 * Вывод информационного сообщения под полем даты.
 *
 * @param identifier
 * @param message
 * @param is_error
 */
export function showDateFieldInfo(identifier, message, is_error) {
    let wrap = $(identifier).parent();

    if (!wrap.find('div').is('.error-text')) {
        wrap.append('<div class="error-text u-hide"></div>')
    }

    let error_block = wrap.find('.error-text');
    error_block.html('<span class="' + (is_error !== true ? 'info' : '') + '" style="text-transform: none;">' + message + '</span>').removeClass('u-hide');

    wrap.closest('.InputDatePicker').addClass(is_error ? 'field-error' : 'field-info').removeClass(is_error ? 'field-info' : 'field-error');
}

/**
 * Скрытие информационного сообщения под полем даты.
 *
 * @param identifier
 */
export function hideDateFieldInfo(identifier) {
    $(identifier).parent().find('.error-text').addClass('u-hide').closest('.InputDatePicker').removeClass('field-info');
}

/**
 * Скрытие ошибки.
 *
 * @param element
 */
export function hideFieldError(element) {
    $(element).parent().find('.error-text').addClass('u-hide').removeClass('field-error');
}

/**
 * Добавления класса к инпуту, обозначающего, что он не пуст.
 *
 * @param selector
 */
export function fieldNotEmpty(selector) {
    $(selector).parent('.field').addClass('field-not-empty');
}

/**
 * Удаление класса инпута, обозначающего, что он не пуст.
 *
 * @param selector
 */
export function fieldEmpty(selector) {
    $(selector).parent('.field').removeClass('field-not-empty');
}

/**
 * Выделение чекбокса.
 *
 * @param input
 * @param checked - если установлен выделяется или снимается по нему
 */
export function changeCheckbox(input, checked) {

    input = $(input.target || input);

    checked = checked === undefined ? input.prop('checked') : checked;

    if (checked) {
        input.prev('.option-input').addClass('option-input-checked');
    } else {
        input.prev('.option-input').removeClass('option-input-checked');
    }

}

/**
 * Выделение радио.
 *
 * @param input
 */
export function changeRadio(input) {

    input = input.target || input;

    $(input).closest('.checkbox-radio-container').find('.option-input').removeClass('option-input-checked');

    if ($(input).prop('checked')) {
        $(input).prev('.option-input').addClass('option-input-checked');
    }

}

/**
 * Смена значения селекта.
 *
 * @param element
 * @param value
 */
export function setSelectValue(element, value) {
    element.val(value).trigger('change.select2');
    let text = element.find(`option[value="${value}"]`).text();
    element.parent().find('.select2-selection__rendered').html(text);
}

/**
 * Смена значения "быстрого" селекта.
 * @param identifier
 * @param value
 */
export function setQuickSelectValue(identifier, value) {

    let select_value = $(identifier);

    select_value.val(value);

    let wrap = select_value.parent();

    wrap.find('.item.selected').removeClass('selected');

    let selected_option = wrap.find('.item[data-value='+value+']').addClass('selected').text();

    wrap.find('.display .selected-value').text(selected_option);
}

/**
 * Установка значения поля типа date.
 *
 * @param selector
 * @param value
 * @param display_text
 */
export function setDateField(selector, value, display_text) {

    selector = $(selector);

    selector.attr('value', value).val(value);

    selector.parent().find('.DateInput__display-text').text(display_text).addClass('DateInput__display-text--has-input');

    selector.closest('.InputDatePicker').addClass('field-not-empty');
}

/**
 * Очистка значения поля типа daterange.
 *
 * @param start_id
 * @param end_id
 */
export function clearDateRangeField(start_id, end_id) {

    let selector = $('#'+start_id+', #'+end_id);

    selector.attr('value', '').val('');
    selector.parent().find('.DateInput__display-text').text('').removeClass('DateInput__display-text--has-input');

}

/**
 * Обработчик изменения атрибутов.
 * (используется для отслеживания изменения daterange)
 */
let MutationObserver = (function () {
    let pref = ['WebKit', 'Moz', 'O', 'Ms', ''];

    for (let i = 0; i < pref.length; i++) {
        if (pref[i] + 'MutationObserver' in window) {
            return window[pref[i] + 'MutationObserver'];
        }
    }
    return false;
}());

export function mutationObserve(id, handler) {

    if (!$('*').is('#' + id)) {
        return;
    }

    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(handler);
    });

    observer.observe(document.getElementById(id), {
        attributes: true,
    });

    return observer;
}