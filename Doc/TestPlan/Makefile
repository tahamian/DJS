filename=hello

pdf: ps
	ps2pdf ${filename}.ps

ps:	dvi
	dvips -t letter ${filename}.dvi

dvi:
	latex ${filename}
	bibtex ${filename}||true
	latex ${filename}
	latex ${filename}

clean:
	rm ${filename}.ps
	rm ${filename}.pdf
	rm ${filename}.log
	rm ${filename}.aux
	rm ${filename}.dvi
	rm ${filename}.bbl
	rm ${filename}.blg
