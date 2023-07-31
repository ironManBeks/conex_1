// Я не понял какая логика на сайте https://www.trudoor.com/. Поэтому раписал как я вижу это у нас.
// Будет объект со множеством вложенностей.

export const CreateDoorApi_NEXT_STEP = {
    pageId: "pageId_1",
    pageTitle: "Главный заголовок страницы",
    description: "Lalalalala",
    fields: [
        {
            fieldId: "fieldId_1",
            fieldType: "cards",
            fieldName: "doorMaterial",
            fieldTitle: "Материал",
            fieldTitleSize: "small",
            fieldRequired: true,
            fieldElements: [
                {
                    elementId: "elementId_1",
                    mainTitle: "Дерево",
                    subTitle: "настоящее дерево",
                    value: "wood",
                    popular: true,
                    price: 123,
                    priceCurrency: "$",
                },
                {
                    elementId: "elementId_2",
                    mainTitle: "Железо",
                    subTitle: "железное железо",
                    value: "iron",
                    popular: false,
                    price: 9999,
                    priceCurrency: "$",
                },
            ],
        },
        {
            fieldId: "fieldId_2",
            fieldType: "checkbox",
            fieldName: "accessories",
            fieldTitle: "Аксессуары",
            fieldTitleSize: "small",
            fieldRequired: false,
            fieldElements: [
                {
                    elementId: "elementId_3",
                    title: "Ручка",
                    value: "handle",
                    popular: true,
                },
                {
                    elementId: "elementId_4",
                    title: "Звонок",
                    value: "bell",
                    popular: false,
                },
            ],
        },
    ],

    // Допустим следующий шаг будет зависеть от выбора в поле fieldId_1.
    // В данном случае Аксессуары не влияют на дальнейший шаг.
    nextStep: {
        wood: {
            pageId: "pageId_2",
            pageTitle: "Выберите структуру дерева",
            fields: [
                {
                    fieldId: "fieldId_1",
                    fieldType: "cards",
                    fieldElements: [
                        { value: "oreh" },
                        { value: "bereza" },
                        { value: "fanera" },
                    ],
                },
            ],
            nextStep: {
                //
                // здесь представлена логика, если у 2-х значений одинаковый путь, а у 3-го другой
                // минус этой логики, в том, что пути дублируются. тем самым чутка увеличивая размер объекта.
                //
                oreh: {
                    pageId: "....",
                    nextStep: {
                        // тут путь дубликат нижнего
                        1: "Такой же путь как и внизу. Допустим из 5 страниц",
                    },
                },
                bereza: {
                    pageId: "....",
                    nextStep: {
                        // тут путь дубликат вехнего
                        1: "Такой же путь как и вверху. Допустим из 5 страниц",
                    },
                },
                fanera: {
                    pageId: "....",
                    nextStep: {
                        //
                        1: "Отдельный путь. Допустим из 20 страниц",
                    },
                },
            },
        },
        iron: {
            pageId: "pageId_3",
            pageTitle: "Выберите состав железа",
            fields: [
                // .....
            ],
            nextStep: {
                // .....
            },
        },
    },
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//
// Тут в элементы у "firstStep" добавляется поле "steps".

export const CreateDoorApi_ALL_STEPS = {
    firstStep: {
        pageId: "pageId_1",
        pageTitle: "Главный заголовок страницы",
        description: "Lalalalala",
        fields: [
            {
                fieldId: "fieldId_1",
                fieldType: "cards",
                fieldName: "doorMaterial",
                fieldTitle: "Материал",
                fieldTitleSize: "small",
                fieldRequired: true,
                fieldElements: [
                    {
                        elementId: "elementId_1",
                        mainTitle:
                            "metal single and double door with and without frame",
                        value: "metalSingleAndDoubleDoorWithAndWithoutFrame",
                        popular: true,
                        price: 123,
                        priceCurrency: "$",
                        steps: {
                            pageId_2: {
                                id: "pageId_2",
                                // haveSubPage это есть ли в этой странице ответвление. Смотреть pageId_2.
                                // т.е. после второго шага пользователь возможно сразу перейдёт на страницу "pageId_3"
                                // или пройдёт по "pageId_6" -> "pageId_7", а затем всё равно перейдёт на страницу "pageId_3"
                                subPages: {
                                    pageId_6: {
                                        id: "pageId_6",
                                    },
                                    pageId_7: {
                                        id: "pageId_7",
                                    },
                                },
                            },
                            pageId_3: {
                                id: "pageId_3",
                            },
                        },
                    },
                    {
                        elementId: "elementId_2",
                        mainTitle: "wood single door",
                        value: "woodSingleDoor",
                        popular: false,
                        price: 9999,
                        priceCurrency: "$",
                        steps: {
                            pageId_3: { id: "pageId_3" },
                            pageId_4: { id: "pageId_4" },
                            pageId_5: { id: "pageId_5" },
                        },
                    },
                ],
            },
        ],
    },
    _allPages: {
        // страница, в которой возможно ответвление на страницы pageId_6 и pageId_7
        pageId_2: {
            pageId: "pageId_2",
            pageTitle: "Окно",
            fields: [
                {
                    fieldId: "fieldId_22",
                    fieldType: "cards",
                    fieldName: "window",
                    fieldTitle: "Окно",
                    fieldElements: [
                        {
                            mainTitle: "НЕТ окна",
                            // Если выбор "none", то сразу перехожу на следующий шаг (НЕ subSteps)
                            value: "none",
                        },
                        {
                            mainTitle: "Есть окно",
                            // Если другой выбор, то продолжаю на следующий шаг,
                            // который описан в firstStep->fields->fieldElements->steps->subPages->
                            // А по окнончанию страниц в subPages к firstStep->fields->fieldElements->steps
                            value: "yesIn",
                        },
                    ],
                },
            ],
            subSteps: {
                pageId_6: {
                    id: "pageId_6",
                },
                pageId_7: {
                    id: "pageId_7",
                },
            },
        },
        pageId_3: {
            pageTitle: "3 3 3",
            fields: [],
        },
        pageId_4: {
            pageTitle: "4 4 4 4",
            fields: [],
        },
        pageId_5: {
            ageTitle: "5 5 5 5 5",
            fields: [],
        },
        // subPage от шага
        pageId_6: {
            ageTitle: "subPage_6",
            parentId: "pageId_2",
            fields: [
                {
                    fieldId: "fieldId_66",
                    fieldType: "cards",
                    fieldName: "windowPosition",
                    fieldTitle: "Позиция окна",
                    fieldElements: [
                        {
                            mainTitle: "Угол",
                            value: "corner",
                        },
                        {
                            mainTitle: "Центр",
                            value: "center",
                        },
                    ],
                },
            ],
        },
        pageId_7: {
            ageTitle: "subPage_6",
            parentId: "pageId_2",
            fields: [],
        },
    },
};

// Допустим я выбрал "wood", "handle" и "bell".
// На бэк отправится
// *****___*****___*****
// POST /create-door
// {
//      doorMaterial: "wood",
//      accessories: ["handle", "bell"]
// }
