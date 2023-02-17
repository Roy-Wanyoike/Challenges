
    function sum() {
        sumofnums = 0;
        nums = document.getElementById("nums").value.split(",");
        for (i = 0; i < nums.length; i++) {
          sumofnums += parseInt(nums[i]);
        }
        document.getElementById("sum").innerHTML = sumofnums;
      }
