import sys

# FUNCTIONS

def start():
	print ('CHAT BOT ACTIVATED!!')

def respond():
	print ('HI THERE EXAMPLE ANALYZER')

def ender():
	print ('CHAT BOT DEACTIVATED!!')
	exit()


# CODE

start()

while True:
    # line = sys.stdin.readline()
    line=input()

    if line == "exit":
    	ender()
    elif line == "hello":
    	respond()
    else:
    	print ('dunno')
