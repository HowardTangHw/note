func lemonadeChange(bills []int) bool {
	five, ten := 0,0
	for _,bill := range bills {
		if(bill == 5){
			five++
		}

		if bill == 10 {
			if(five <= 0){
				return false;
			}
			ten++;
			five--;
		}

		if bill == 20 {
			if five > 0 && ten > 0 {
				ten--
				five--
			} else if five >= 3{
				five -= 3;
			}else{
				return false;
			}
		}
	}
	return true;
}
