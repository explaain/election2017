module.exports = function(){
  return function(text) {
    return text.replace(
      /\[([^\]]+)\]\(([^\)]+)\)/g,
      "<a class='internal' tabindex='-1' href='$2'>$1</a>"
    );
  }
}
