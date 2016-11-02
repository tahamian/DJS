filename=MAIN_LATEX_FILE_NAME_WITHOUT_.tex

pdf: ps
	ps2pdf ${filename}.ps

pdf-print: ps
	ps2pdf -dColorConversionStrategy=/LeaveColorUnchanged -dPDFSETTINGS=/printer ${filename}.ps
ps:	dvi
	dvips -t letter ${filename}.dvi

dvi:
	latex ${filename}
	bibtex ${filename}||true
	latex ${filename}
	latex ${filename}
cleanall: clean
	rm -f ${filename}.pdf
clean:
	rm -f ${filename}.{ps,log,aux,out,dvi.bbl,blg}
