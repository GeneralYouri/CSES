import solution from './1623.mjs';

test('Provided test cases', () => {
    expect(solution(['5', '3 2 7 4 1'])).toBe(1);
    expect(solution(['10', '603 324 573 493 659 521 654 70 718 257'])).toBe(2);
    expect(solution(['20', '13048212 423374770 19874608 812293014 860896267 224937483 907570920 952166494 450127366 887381168 966393898 102318919 723213664 491414754 571209206 99007249 302987622 263275846 36174214 727737543'])).toBe(8231);
});
