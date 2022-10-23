$(function ()
{
    let status=false;
    function Card(name, suit, value)
    {
        this.name=name;
        this.suit=suit;
        this.value=value;
    }
    let desc = [
        new Card('Ace', 'Clubs', 11),
        new Card('King', 'Clubs', 10),
        new Card('Queen', 'Clubs', 10),
        new Card('Jack', 'Clubs', 10),
        new Card('Ten', 'Clubs', 10),
        new Card('Nine', 'Clubs', 9),
        new Card('Eight', 'Clubs', 8),
        new Card('Seven', 'Clubs', 7),
        new Card('Six', 'Clubs', 6),
        new Card('Five', 'Clubs', 5),
        new Card('Four', 'Clubs', 4),
        new Card('Three', 'Clubs', 3),
        new Card('Two', 'Clubs', 2),

        new Card('Ace', 'Diamonds', 11),
        new Card('King', 'Diamonds', 10),
        new Card('Queen', 'Diamonds', 10),
        new Card('Jack', 'Diamonds', 10),
        new Card('Ten', 'Diamonds', 10),
        new Card('Nine', 'Diamonds', 9),
        new Card('Eight', 'Diamonds', 8),
        new Card('Seven', 'Diamonds', 7),
        new Card('Six', 'Diamonds', 6),
        new Card('Five', 'Diamonds', 5),
        new Card('Four', 'Diamonds', 4),
        new Card('Three', 'Diamonds', 3),
        new Card('Two', 'Diamonds', 2),

        new Card('Ace', 'Hearts', 11),
        new Card('King', 'Hearts', 10),
        new Card('Queen', 'Hearts', 10),
        new Card('Jack', 'Hearts', 10),
        new Card('Ten', 'Hearts', 10),
        new Card('Nine', 'Hearts', 9),
        new Card('Eight', 'Hearts', 8),
        new Card('Seven', 'Hearts', 7),
        new Card('Six', 'Hearts', 6),
        new Card('Five', 'Hearts', 5),
        new Card('Four', 'Hearts', 4),
        new Card('Three', 'Hearts', 3),
        new Card('Two', 'Hearts', 2),

        new Card('Ace', 'Spades', 11),
        new Card('King', 'Spades', 10),
        new Card('Queen', 'Spades', 10),
        new Card('Jack', 'Spades', 10),
        new Card('Ten', 'Spades', 10),
        new Card('Nine', 'Spades', 9),
        new Card('Eight', 'Spades', 8),
        new Card('Seven', 'Spades', 7),
        new Card('Six', 'Spades', 6),
        new Card('Five', 'Spades', 5),
        new Card('Four', 'Spades', 4),
        new Card('Three', 'Spades', 3),
        new Card('Two', 'Spades', 2),
    ];
    let used_cards=new Array();// Чтобы проверить есть ли карта в массиве(для уже использованных карт, в массиве будет индекс used_card)
    function getRand(num)
    {
        let my_num = Math.floor(Math.random()*num);
        return my_num;
    }
    let hand =
        {
            cards: new Array(),
            current_total:0,//накапливаем значения карт в руке игрока
            sumCardTotal: function () {//функция срабатывает когда рука получает новую карту и пересчитывает сумму карт
                this.current_total = 0;//обнуляем свойство количество очок в руке игрока
                for (let i = 0; i < this.cards.length; i++) {
                    let c = this.cards[i];//выделяем карту для упрещенного использования
                    //this.current_total=this.cards[i].value;
                    this.current_total += c.value;//упрощенный вариант
                }
                $("#hdrTotal").html("Total - " + this.current_total);//выводим сумму карт

                // Проверяем условия игры
                if (this.current_total > 21) {
                    $("#btnStick").trigger("click");
                    $("#hdrResult").html("Проигрыш");
                    $("#imgresult").attr('src', 'images/x.png').show();
                    $("#result").show();
                    status=true;
                } else if (this.current_total==21)
                {
                    $("#btnStick").trigger("click");
                    $("#hdrResult").html("BlackJack!!!");
                    $("#imgresult").attr('src', 'images/check.png').show();
                    $("#result").show();
                    status=true;
                }
                else if(this.current_total < 21 && this.cards.length == 5)
                {
                    $("#btnStick").trigger("click");
                    $("#hdrResult").html("BlackJack5Card!!!");//супер Black Jack
                    $("#imgresult").attr('src', 'images/check.png').show();
                    $("#result").show();
                    status=true;
                }
            }
        }
    function hit()
    {
        let good_card = false;
        do{
            let index = getRand(desc.length);
            //if(!$.inArray(index, used_cards)>-1)
            if($.inArray(index, used_cards)==-1)// функция inArray проверяет есть ли в массиве значение переменной index, если да, то вернет индекс этого значения в массиве, а если значение не найдено - вернет -1
                //нас интересуют условия при котором функция inArray вернет -1, это значит что под рандомным номером карта в игре еще не использовалась
            {
                good_card=true;//нашли подходящую карту
                //вытаскиваем карту с колоды как обьект
                const c = desc[index];
                used_cards[used_cards.length]=index;//добавляем индекс карты в массив использованых карт
                hand.cards[hand.cards.length]=c;
                let $d = $("<div>");// создаем элемент DOM тег div
                $d.addClass("current_hand").appendTo("#my_hand");//в div добавляем class, а сам div методом appendTo добавляем в элемент в id myhand который создан в html странице
                $("<img>").appendTo($d).attr('src', 'images/'+c.suit+'/'+c.name+'.jpg').fadeOut('slow').fadeIn('slow');
            }
        }
        while(!good_card);
        good_card=false;
        //подсчитываем количество очков в руках игрока
        hand.sumCardTotal();
    }

    //hit();
    function deal()//функцию hit вызываем два раза
    {
        for(i=0; i<2; i++)
        {
            hit();
        }
    }
    $("#btnDeal").click(function ()
    {
        deal();
        $("#btnHit").toggle();
        $(this).toggle();
        $("#btnStick").toggle();
    });
    $("#btnHit").click(function ()
    {
        if(status==false)
        {
            hit();
        }
    });
    $("#result").click(function ()
    {
        //$("#result").toggle();
        $(this).toggle();
        $("#imgresult").attr('src', '');
        $("#hdrTotal").html("");
        $("#my_hand").empty();//удаляем все карты
        $("#hdrResult").html("");//очищаем содержимое элемента
        used_cards.length=0;//обнуляем массив использованых карт
        hand.current_total=0;//сбрасываем сумму карт в руке
        hand.cards=[];
        status=false;
        $("#btnDeal").toggle().trigger('click');//имитируем событие клик для новой раздачи
        $("#btnHit").toggle();
        $("#btnStick").toggle();
    });
    $("#btnStick").click(function ()
    {
        $("#hdrResult").html('stick!');
    });
})
//сделать заново