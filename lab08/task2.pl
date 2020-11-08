input(A, B) :- read(A), read(B).

write_number(CURRENT, A) :- 
    SQUARE is CURRENT * CURRENT,
    SQUARE >= A,
    write(SQUARE),
    write(" ").

print_nums(A, B, CURRENT) :- 
    CURRENT_NEW is CURRENT + 1, 
    TMP is CURRENT_NEW * CURRENT_NEW,
    B >= TMP,
    write_number(CURRENT_NEW, A),
    print_nums(A, B, CURRENT_NEW).


f :- input(A, B), print_nums(A, B, 0).