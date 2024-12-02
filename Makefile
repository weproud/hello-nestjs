NAME=nest

ngm:
	 nest generate module ${NAME}

ngc:
	 nest generate controller ${NAME} 

ngs:
	 nest generate service ${NAME} 

ngmi:
	 nest generate middleware ${NAME} 

ngt: ngm ngc ngs