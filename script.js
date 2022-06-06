// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minWeightInput = document.querySelector('.minweight__input'); // поле ввода минимального веса
const maxWeightInput = document.querySelector('.maxweight__input'); // поле ввода максимального веса 
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const filterClearButton = document.querySelector('.filterClear__btn'); // кнопка сброса фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления фрукта

minWeightInput.value = 0; // инициализация полей диапазона фильтрации
maxWeightInput.value = 0;

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розовый", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "оранжевый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*Отображение*/


const display = () => { // отрисовка карточек


  fruitsList.innerHTML = null; // очистка fruitsList от вложенных элементов, чтобы заполнить актуальными данными из fruits
  
  for (let i = 0; i < fruits.length; i++) { // формирование нового элемента <li> при помощи document.createElement, и добавление в конец списка fruitsList при помощи document.appendChild
        
    let divIndex = document.createElement('div');
    divIndex.className = 'fruit__info';
    divIndex.textContent = 'index # ' + i;

    let divKind = document.createElement('div');
    divKind.className = 'fruit__info';
    divKind.textContent = 'kind: ' + fruits[i].kind;

    let divColor = document.createElement('div');
    divColor.className = 'fruit__info';
    divColor.textContent = 'color: ' + fruits[i].color;

    let divWeight = document.createElement('div');
    divWeight.className = 'fruit__info';
    divWeight.textContent = 'weight (кг): ' + fruits[i].weight;
    
    let divMain = document.createElement('div');
    divMain.className = 'fruit__info';
    divMain.appendChild(divIndex);
    divMain.appendChild(divKind);
    divMain.appendChild(divColor);
    divMain.appendChild(divWeight);

    let li_block = document.createElement('li');
    switch(fruits[i].color) {
      case 'красный': li_block.className = 'fruit__item fruit_red'; break
      case 'оранжевый': li_block.className = 'fruit__item fruit_orange'; break
      case 'желтый': li_block.className = 'fruit__item fruit_yellow'; break
      case 'зеленый': li_block.className = 'fruit__item fruit_green'; break
      case 'бледно-зеленый': li_block.className = 'fruit__item fruit_chartreuse_green'; break
      case 'ярко-зеленый': li_block.className = 'fruit__item fruit_spring_green'; break
      case 'голубой': li_block.className = 'fruit__item fruit_cyan'; break
      case 'лазурный': li_block.className = 'fruit__item fruit_azure'; break
      case 'синий': li_block.className = 'fruit__item fruit_blue'; break
      case 'фиолетовый': li_block.className = 'fruit__item fruit_violet'; break
      case 'пурпурный': li_block.className = 'fruit__item fruit_magenta'; break
      case 'розовый': li_block.className = 'fruit__item fruit_rose'; break
    } 
    li_block.innerHTML = divMain.innerHTML;
    fruitsList.appendChild(li_block);
  }
};

archiveArr = fruits.slice(); /// первая отрисовка карточек, а также сохранение резервной копии основного массива для восстановления при отмене операций. Например, сброс фильтра.
display(); 

/*Перемешивание*/

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  controlArr = fruits.slice(); // копия старого массива для проверки совпадения при перемешивании
  while (fruits.length > 0) {
    // находим случайный элемент из fruits, используя numRandom, вырезаем его из fruits и вставляем в result.
    // (массив fruits будет уменьшатся, а result заполняться)
    numRandom = Math.floor(Math.random()*fruits.length);
    result.push(fruits[numRandom]);
    fruits.splice(numRandom, 1);
  }
  fruits = result;
  
  // Для исключения повторения массива при перемешиваниия, я думаю, что самый простой способ - это использовать JSON stringify.
  // Это преобразует объекты fruits и controlArr в строки, чтобы их можно было сравнить. 
  // Обращаю внимание на то, что теперь сравниваются не массивы бъектов, а строковые представления объектов.
  if (JSON.stringify(fruits) === JSON.stringify(controlArr)) {
    alert('Старый и новый массивы совпадают!!! Поворите перемешивание!!!');
  }
};

// при нажатии кнопки  - перемешивание и вывод нового массива
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*Фильтрация*/

const filterFruits = () => {  // фильтрация массива
  let result = [];
 
  if (parseInt(minWeightInput.value) == 0 && parseInt(maxWeightInput.value == 0)) {  // проверка корректности значений верхней и нижней границ диапазона веса для выполнения фильтрации
    alert('Параметры фильтрации заданы некорректно!!!');
    return fruits;
  } 
  if (parseInt(minWeightInput.value) < 0 || parseInt(maxWeightInput.value < 0)) {
    alert('Вес фруктов не может быть отрицательным!!!');
    return fruits;
  } 
  if (parseInt(maxWeightInput.value) < parseInt(minWeightInput.value)) {
    alert('Максимальный вес не может быть меньше минимального веса!!!');
    return fruits;
  } 
    
    for (let i = 0; i < fruits.length; i++) {
      if ((fruits[i].weight >= parseInt(minWeightInput.value)) && (fruits[i].weight <= parseInt(maxWeightInput.value))) {
        result.push(fruits[i]); // проверяем по порядку значения свойства weight в fruits. Если условие выполнено - копируем объект в массив result.
      }
    }
    fruits = result; // по окончанию цикла - копируем объекты из result в fruits для вывода карточек отфильтрованных фруктов по весу.
};

// сброс фильтрации
const filterFruitsClear = () => {
fruits = [];
fruits = archiveArr.slice();
minWeightInput.value = 0;
maxWeightInput.value = 0;
}

filterButton.addEventListener('click', () => { // при нажатии кнопки - проведение фильтрации по указанному диапазону веса фруктов
  fruits = archiveArr.slice(); // восстановление массива из резервной копии перед фильтрацией позволяетя проводить фильтрации по весу несколько раз подряд без сброса фильтрации
  filterFruits();
  display();
});

filterClearButton.addEventListener('click', () => { // при нажатии кнопки  - сброс указанного диапазона веса фруктов и возврат к исходному массиву
  filterFruitsClear();
  display();
});

/*Сортировка*/
let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

sortKindLabel.textContent = sortKind; // инициализация полей
sortTimeLabel.textContent = sortTime;

let priority = ['розовый', 'пурпурный', 'фиолетовый', 'синий', 'лазурный', 'голубой', 'ярко-зеленый', 'бледно-зеленый', 'зеленый', 'желтый', 'оранжевый','красный']; // инициализация массива priority, который является эталоном приоритета цветов

let start, end; // объявление перерменных для замера времени сортировки

const comparation = (fruits1, k) => {
  return (fruits1.color === priority[k]) ? true : false; // функция сравнения двух элементов по цвету для функции bubbleSort
};

function renameColorNum(arr) {
  for (c = 0; c < arr.length; c++) {
    switch(arr[c].color) {  // перевод названий цветов в массиве fruits в числа для реализации алгоритма быстрой сортировки
      case 'красный': arr[c].color = 11; break
      case 'оранжевый': arr[c].color = 10; break
      case 'желтый': arr[c].color = 9; break
      case 'зеленый': arr[c].color = 8; break
      case 'бледно-зеленый': arr[c].color = 7; break
      case 'ярко-зеленый': arr[c].color = 6; break
      case 'голубой': arr[c].color = 5; break
      case 'лазурный': arr[c].color = 4; break
      case 'синий': arr[c].color = 3; break
      case 'фиолетовый': arr[c].color = 2; break
      case 'пурпурный': arr[c].color = 1; break
      case 'розовый': arr[c].color = 0; break
    }
  }
};

function renameNumColor(arr) {
  for (c = 0; c < arr.length; c++) { // возврат названий цветов в массиве fruits после реализации алгоритма быстрой сортировки
    switch(arr[c].color) {
      case 0 : arr[c].color = 'розовый'; break
      case 1 : arr[c].color = 'пурпурный'; break
      case 2 : arr[c].color = 'фиолетовый'; break
      case 3 : arr[c].color = 'синий'; break
      case 4 : arr[c].color = 'лазурный'; break      
      case 5 : arr[c].color = 'голубой'; break
      case 6 : arr[c].color = 'ярко-зеленый'; break
      case 7 :arr[c].color = 'бледно-зеленый'; break
      case 8 : arr[c].color = 'зеленый'; break
      case 9 : arr[c].color = 'желтый'; break
      case 10 : arr[c].color = 'оранжевый'; break
      case 11 : arr[c].color = 'красный'; break
    }
  }
};

function swap(items, firstIndex, secondIndex){ // функция обмена элементов для функции quickSort
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

function partition(items, left, right) { // функция разделитель для функции quickSort
  let pivot = items[Math.floor((right + left) / 2)].color,
      i = left,
      j = right;
  while (i <= j) {
      while (items[i].color < pivot) {
          i++;
      }
      while (items[j].color > pivot) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
}

function bubbleSort(arr, comparation) { // алгоритм пузырьковой сортировки
  const n = arr.length;
  for (let k = 0; k < priority.length; k++){ // счетчик для проверки всех цветов эталонного массива priority
  
    for (let i = 0; i < n-1; i++) {  // внешняя итерация по элементам
      
       for (let j = 0; j < n-1-i; j++) {  // внутренняя итерация для перестановки элемента в конец массива
          
          if (comparation(arr[j], k)) {   // сравниваем элементы
              // делаем обмен элементов
              let temp = arr[j+1]; 
              arr[j+1] = arr[j]; 
              arr[j] = temp; 
            }
          }
      }
  }                    
};


function quickSort(items, left, right) { // алгоритм быстрой сортировки
  let index;
  if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right);
      if (left < index - 1) {
          quickSort(items, left, index - 1);
      }
      if (index < right) {
          quickSort(items, index, right);
      }
  }
}

  sortChangeButton.addEventListener('click', () => { // переключение значения sortKind между 'bubbleSort' / 'quickSort' при нажатии на кнопку
    sortKind = (sortKind === 'bubbleSort') ? 'quickSort' : 'bubbleSort';
    sortKindLabel.textContent = sortKind;
});

function sort(typeSort) { // функция вызова сортировки в зависимости от передваемого параметра
  switch (typeSort) {
    case 'bubbleSort' : 
      bubbleSort(fruits, comparation);
    break;
    case 'quickSort' :
      renameColorNum(fruits);
      quickSort(fruits, 0, (fruits.length - 1));
      renameNumColor(fruits);
    break;
  }
}

sortActionButton.addEventListener('click', () => { // выполняет сортировку и производит замер времени при нажатии на кнопку
  start = new Date().getTime(); 
  sort(sortKind);  
  end = new Date().getTime();
  sortTime = `${end - start} ms`;
  sortTimeLabel.textContent = sortTime;
  display();  
});

/*Добавить фрукт*/

addActionButton.addEventListener('click', () => {
  
  if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '' || parseInt(weightInput.value) < 0) { // проверка заполненности всех полей
    alert('Не все поля заполнены (или в поле WEIGHT отрицательное значение)!!!');    
  } else {
  
    fruits.push({kind: kindInput.value, color: colorInput.value, weight: parseInt(weightInput.value)}); // создание и добавление нового фрукта в массив fruits  
  }

  kindInput.value = null; // очистка строк ввода параметров нового фрукта
  colorInput.value = null;
  weightInput.value = null;
  archiveArr = fruits.slice();
  display();
});