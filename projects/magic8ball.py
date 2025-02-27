import random

def main():
    random_number = random.randint(1, 9)
    id=input("Ask a question")
    if random_number == 1:
        print("It is certain")
    elif random_number == 2:
        print("It is decidedly so")
    elif random_number == 3:
        print("Yes")
    elif random_number == 4:
        print("Reply hazy try again")
    elif random_number == 5:    
        print("Ask again later")
    elif random_number == 6:            
        print("Concentrate and ask again")
    elif random_number == 7:
        print("My reply is no")
    elif random_number == 8:
        print("Outlook not so good")
    elif random_number == 9:
        print("Very doubtful")    
main()