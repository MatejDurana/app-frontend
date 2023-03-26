import random
import time


def roulette_generator():
    roulette = [1, 2, 3]  # 1 is red, 2 is green, 3 is black
    # red: 18/38, green: 2/38, black: 18/38
    probabilities = [18/38, 2/38, 18/38]
    return random.choices(roulette, probabilities)[0]


# example usage
# this will print either 1, 2, or 3 with the corresponding probabilities

money = 1000
bet = 1
loses = 0
cnt = 3

while(1):
    time.sleep(0.0003)
    hod = roulette_generator()
    if(cnt <= 0):
        loses = 0

    if(loses > 5):
        print("cakam ----------------> cnt = " + str(cnt))
        cnt = cnt - 1
        continue
    cnt = 3
    money = money - bet
    if(hod == 1):
        money = money + bet*2
        bet = 1
        loses = 0
    else:
        loses = loses+1
        bet = bet*2

    print(f"bet {bet}, money {money}, hod {hod}")
    if(money < 0):
        print("KONEC")
        break
