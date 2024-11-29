NAME=nest

ngm:
	 nest generate module ${NAME}

ngc:
	 nest generate controller ${NAME} 

ngs:
	 nest generate service ${NAME} 

ngt: ngm ngc ngs