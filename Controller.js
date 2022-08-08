var cards = [];

$(document).ready(function () {
    $.ajax({
        url: 'https://filltext.com/?rows=20&fname=miachle&lname=cors&category=["category1","category2","category3"]&pretty=true',
        type: 'GET',
        success: function (response) {
            console.log(response);

            displayCards(response);
            displayCategories(response);

            




        },
        error: function (error) {
            alert("Error happened fetching data, please reload the page");
            console.log(error);

        }

    });

})

$(document).on("click",".category",function() {
    alert($(this).text());
    filterCategories($(this).text());
});






class Card {

    constructor(category, fname, lname) {
        this.category = category;
        this.fname = fname;
        this.lname = lname;
        this.html = this.makeCard();

    }

    makeCard() {

        var firstChar = this.fname.charAt(0);
        var lastChar = this.lname.charAt(this.lname.length)

        var html = '<div class= card >';

        html += '<div class="avatar">';
        html += '<p class= center-text >' + firstChar + lastChar + '</p>'
        html += '</div>';

        html += '<div>';
        html += this.fname + ' ' + this.lname;
        html += '</div>';

        html += ' <div class= category >';
        html += this.category;
        html += '</div>';

        html += '</div>';

        return html;

    }

}
function filterCategories(category) {

    $('.cards').empty();

    for (var i = 0; i < cards.length; i++) {
        if (category == cards[i].category) {
            $('.cards').append(cards[i].html);
        }
    }

}

function displayCards(response) {

    for (var i = 0; i < response.length; i++) {
        let card = new Card(response[i].category, response[i].fname, response[i].lname);

        cards.push(card);
        $(".cards").append(card.html);


    }

}

function displayCategories(response) {

    var categories = [];
    for (var i = 0; i < response.length; i++) {
        if (categories.includes(response[i].category)) {

            continue;
        }

        categories.push(response[i].category);
        var html = '<div class = category>' + response[i].category + '</div>';

        $(".categories").append(html);


    }

}