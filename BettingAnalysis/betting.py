#!/usr/bin/python3
from math import ceil, floor


def cg_pairs(dna):
    dna_list = []
    count = 0
    legal = ['a', 'c', 'g', 't']
    dna = dna.lower()
    for i in range(len(dna) - 1):
        if dna[i] not in legal:
            print("Error in DNA strand")
            return 0.0
        if dna[i] + dna[i + 1] == "cg":
            count += 1
        dna_list.append(dna[i] + dna[i + 1])
    return count / len(dna_list)


def segment(dna, frame):
    dna_list = []
    initial = 0
    if frame != 0:
        dna_list.append(dna[initial:initial + frame])
        initial += frame
    for i in range(ceil((len(dna) - frame) / 3)):
        dna_list.append(dna[initial:initial + 3])
        initial += 3
    return dna_list


def mark_dna(dna, tag):
    dna_list = ""
    index = 0
    for i in range(len(dna) - 1):
        if i + len(tag) < len(dna):
            if tag == dna[i:len(tag) + i]:
                dna_list += dna[index:i]
                dna_list += ">>" + tag + "<<"
                index = i + len(tag)
    dna_list += dna[index:len(dna)]
    return dna_list


def find_url(title):
    start = 0
    for i in range(len(title) - 1):
        if i > 5:
            if title[i - 6:i] == 'href="':
                start = i
            if start > 0 and title[i] == '"':
                return title[start:i - 1]


def main():
    # print(cg_pairs('cGa'))
    # print(segment('agctttcattctgac', 1))
    print(mark_dna('aatctctactctgcag', 'tct'))
    # print(find_url('</a><span class="mw-editsection-bracket">]</span></span></h2><ul><li><a rel="nofollow" class="external text" href="http://www.intactforests.org/">Intact Forest Landscapes</a></li>'))


if name == "main":
    main()