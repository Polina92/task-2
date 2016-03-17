(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;
    //var CLOSE = root.maze

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */


    //Step by Y next
    function pathYForw(maze, x, y) {
        maze[y][x] = PATH;
        maze[y + 1][x] = CURRENT;
    }

    //Step by Y prev
    function pathYBack(maze, x, y) {
        maze[y][x] = PATH;
        maze[y - 1][x] = CURRENT;
    }

    //Step by X next
    function pathXForw(maze, x, y) {
        maze[y][x] = PATH;
        maze[y][x + 1] = CURRENT;
    }

    //Step by X prev
    function pathXBack(maze, x, y) {
        maze[y][x] = PATH;
        maze[y][x - 1] = CURRENT;
    }

    //Cancel last step
    function prevStep(maze, x, y) {
        maze[y][x] = -5;

        switch (maze.prevs[maze.prevs.length - 1]) {
            case 'Y':
                maze[y - 1][x] = CURRENT;
                maze.prevs.pop();
                y--;
                road(maze, x, y);
                break;

            case 'Y-1':
                maze[y + 1][x] = CURRENT;
                maze.prevs.pop();
                y++;
                road(maze, x, y);
                break;

            case 'X':
                maze[y][x - 1] = CURRENT;
                maze.prevs.pop();
                x--;
                road(maze, x, y);
                break;

            case 'X-1':
                maze[y][x + 1] = CURRENT;
                maze.prevs.pop();
                x++;
                road(maze, x, y);
                break;

            default:
                return console.log('there is a wrong value in array of prev steps (maze.prevs)');
        }
    }

    //Draw road with showing passed points and current
    function road(maze, x, y) {
        if (y != maze.length - 1) {

            if (maze[y + 1][x] == 0) {
                maze.prevs.push('Y');
                pathYForw(maze, x, y);
                y++;
                return road(maze, x, y);

            } else if (maze[y][x + 1] == 0) {
                maze.prevs.push('X');
                pathXForw(maze, x, y);
                x++;
                return road(maze, x, y);

            } else if (maze[y - 1][x] == 0) {
                maze.prevs.push('Y-1');
                pathYBack(maze, x, y);
                y--;
                return road(maze, x, y);

            } else if (maze[y][x - 1] == 0) {
                maze.prevs.push('X-1');
                pathXBack(maze, x, y);
                x--;
                return road(maze, x, y);

            } else {
                return prevStep(maze, x, y);
            }

        } else {
            return false;
        }
    }

    function solution(maze, x, y) {
        var x0 = 1;
        var y0 = 0;
        maze[y0][x0] = CURRENT;
        x = x0;
        y = y0;
        maze.prevs = []; //array for remembering prev steps
        road(maze, x, y);
    }

    root.maze.solution = solution;
})
(this);
