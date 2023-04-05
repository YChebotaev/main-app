class Iti {
    static mask($input) {
        let placeholder = $input.attr('placeholder');
        placeholder = placeholder.replace(new RegExp("[0-9]", "g"), "9");
        $input.inputmask(placeholder, {reverse: false});
    }

    static isValidNumber($input) {
        return $input.intlTelInput('isValidNumber')
    }
}