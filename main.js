let app = new Vue({
  el: '#app',
  data: {
    newStrings: [],
    dayNumber: '',
    taskStorage: {},
    savedRecords: [],
    organaizerObj: {},
    organaizerShow: false,
    editElement: '',
    newElem: '',
    selectedTasks: [],
    date: new Date(),
    selectedDayIndex: 0,
    selectedYear: new Date().getFullYear(),
    selectMonth: new Date().getMonth(),
    dFirstMonth: '1',
    day: ['Mn', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    monthes: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },

  methods: {
    range: function (from, to) {
      let result = [];
      for (let i = from; i <= to; i++) {
        result.push(i);
      }
      return result;
    },
    removeAffair(i) {
      this.selectedTasks.splice(i, 1);
      this.taskStorage[this.dayNumber].splice(i, 1);
      // console.log(this.array);
    },
    checkedEl(i) {
      this.selectedTasks[i].cssClass = 'checked';
    },
    editArray(i) {
      this.selectedTasks[i].showInput = true;
      this.editElement = this.selectedTasks[i].name;
      this.selectedTasks[i].name = '';
    },
    editReady(i) {
      this.selectedTasks[i].name = this.editElement;
      this.selectedTasks[i].showInput = false;
    },
    addElement() {
      let newTask = {
        name: this.newElem,
        cssClass: '',
        showInput: false,
      };

      if (this.newElem.length) {
        this.selectedTasks.push(newTask);
        this.newElem = '';
        this.dayNumber = `${this.selectedYear}/${this.monthes[this.selectMonth]}/${this.selectedDayIndex}`;

        if (!this.taskStorage[this.dayNumber]) {
          this.taskStorage[this.dayNumber] = [];
        }
        this.taskStorage[this.dayNumber].push(newTask);
        // this.selectedTasks.push();
        // console.log(this.newSaveRecord);
      }
      // -- //
      // newSaveRecord[dayNumber] = [
      // {newTask}, {newTask}
      // ]
      // -- //
    },

    showTaskСhosenDay(key) {
      // this.newSaveRecord[this.dayNumber] = newTask;
      this.selectedYear = key;
      this.selectMonth = key;
    },

    showOrganaizer(index, day, i) {
      this.organaizerShow = true;
      if (!this.organaizerObj[index]) {
        this.organaizerObj[index] = [];
      }
      this.selectedTasks = this.organaizerObj[index];
      // this.array.push(this.organaizerObj[index]);
      console.log(this.selectedTasks);

      // -- //
      // this.array = [ {this.organaizerObj[index]} ]
      // -- //
      this.selectedDayIndex = index;
    },
    calendar: function () {
      var days = [];
      var week = 0;
      days[week] = [];
      var dayLast = new Date(this.selectedYear, this.selectMonth + 1, 0).getDate();
      for (let i = 1; i <= dayLast; i++) {
        if (new Date(this.selectedYear, this.selectMonth, i).getDay() != this.dFirstMonth) {
          let colorOfDays = { index: i };
          if (this.selectedDayIndex === i) {
            colorOfDays.selectDay = true;
          }
          days[week].push(colorOfDays);
          if (
            i == new Date().getDate() &&
            this.selectedYear == new Date().getFullYear() &&
            this.selectMonth == new Date().getMonth()
          ) {
            colorOfDays.current = 'borderDay';
          }

          if (
            new Date(this.selectedYear, this.selectMonth, i).getDay() == 6 ||
            new Date(this.selectedYear, this.selectMonth, i).getDay() == 0
          ) {
            colorOfDays.weekend = 'colorRed';
          }
        } else {
          week++;
          days[week] = [];
          colorOfDays = { index: i };
          days[week].push(colorOfDays);
          if (
            i == new Date().getDate() &&
            this.selectedYear == new Date().getFullYear() &&
            this.selectMonth == new Date().getMonth()
          ) {
            colorOfDays.current = 'borderDay';
          }
        }
      }
      if (days[0].length > 0) {
        for (let i = days[0].length; i < 7; i++) {
          days[0].unshift('');
        }
      }
      this.dayChange;
      return days;
    },
    InstallMounth: function (index) {
      this.selectMonth = index.target.value;
    },
    InstallYear: function (i) {
      this.selectedYear = i.target.value;
    },
  },
  computed: {
    count() {},
    dayChange: function () {
      if (this.dFirstMonth == 0) {
        this.day = ['Su', 'Mn', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      } else {
        this.day = ['Mn', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
      }
    },
  },
});
