function toogleFirstSelection(){
  let first = document.getElementsByName("firstStat")[0];
  let second = document.getElementsByName("secondStat")[0];
  let third = document.getElementsByName("thirdStat")[0];
  let fourth = document.getElementsByName("fourthStat")[0];
  let fifth = document.getElementsByName("fifthStat")[0];

  if  (!items[0]){
    let item0 = new RGElement("", [first.value, second.value, third.value, fourth.value, fifth.value], [0, 0, 255]);
    items[0] = item0;
  }

  items[0].selected = !items[0].selected;
  first.value = items[0].stats[0];
  second.value = items[0].stats[1];
  third.value = items[0].stats[2];
  fourth.value = items[0].stats[3];
  fifth.value = items[0].stats[4];
}

function toogleSecondSelection(){
  let first = document.getElementsByName("firstStat2")[0];
  let second = document.getElementsByName("secondStat2")[0];
  let third = document.getElementsByName("thirdStat2")[0];
  let fourth = document.getElementsByName("fourthStat2")[0];
  let fifth = document.getElementsByName("fifthStat2")[0];

  if  (!items[1]){
    let item1 = new RGElement("", [first.value, second.value, third.value, fourth.value, fifth.value], [255, 0, 0]);
    items[1] = item1;
  }

  items[1].selected = !items[1].selected;
  first.value = items[1].stats[0];
  second.value = items[1].stats[1];
  third.value = items[1].stats[2];
  fourth.value = items[1].stats[3];
  fifth.value = items[1].stats[4];
}

function setFirstStat() {
  let first = document.getElementsByName("firstStat")[0];
  let second = document.getElementsByName("secondStat")[0];
  let third = document.getElementsByName("thirdStat")[0];
  let fourth = document.getElementsByName("fourthStat")[0];
  let fifth = document.getElementsByName("fifthStat")[0];

  if (items[0]){
    items[0].stats[0] = first.value;
    items[0].stats[1] = second.value;
    items[0].stats[2] = third.value;
    items[0].stats[3] = fourth.value;
    items[0].stats[4] = fifth.value;
  }
}

function setSecondStat() {
  let first = document.getElementsByName("firstStat2")[0];
  let second = document.getElementsByName("secondStat2")[0];
  let third = document.getElementsByName("thirdStat2")[0];
  let fourth = document.getElementsByName("fourthStat2")[0];
  let fifth = document.getElementsByName("fifthStat2")[0];

  if (items[1]){
    items[1].stats[0] = first.value;
    items[1].stats[1] = second.value;
    items[1].stats[2] = third.value;
    items[1].stats[3] = fourth.value;
    items[1].stats[4] = fifth.value;
  }
}
