$(document).ready(function() {
    const selectOptions = {
        language: {
            noResults: () => 'Список пуст'
        }
    }

    $('.u-select:not(.u-select_hide-searcher) > select').select2({ ...selectOptions });

    $('.u-select.u-select_hide-searcher > select').select2({
        ...selectOptions,
        minimumResultsForSearch: -1
    });

    $('.u-select.u-select_currency').change(function () {
        const $selected = $(this).find('.select2-selection__rendered')

        const selectedText = getSelectedOptionText($selected.text())

        $(this).find('.select2-selection__rendered').html(selectedText)
    })
});