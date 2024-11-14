// チェックしたい言葉のリスト
const keywords = ["つらい", "死にたい", "しにたい", "消えたい", "不安"];

$(document).ready(function () {
 
    // 保存ボタンをクリックするとメモをローカルストレージに保存
    $("#save").on("click", function () {
        const key = $("#date").val();
        const value = $("#memo").val();
        
        localStorage.setItem(key, value);
        const html = `
            < li >
               <p> ${key} </p>
               <p> ${value} </p>
            </li >
            `;
        $("#list").append(html);

        checkKeywords(); // 保存後にキーワードチェックを行う
        alert("メモが保存されました！");
    });

    // クリアボタンをクリックするとメモ内容を削除し、ローカルストレージもクリア
    $("#clear").click(function () {
        $("#memo").val(""); // テキストエリアをクリア
        localStorage.removeItem("memoContent"); // ローカルストレージから削除

    });

    // キーワードが含まれているか確認
    function checkKeywords() {
        const content = $("#memo").val();
        let hasKeyword = false;

        // キーワードリストを順に確認
        keywords.forEach(function (keyword) {
            if (content.includes(keyword)) {
                hasKeyword = true;
            }
        });

        // キーワードが含まれていれば心配コメントに変化
        if (hasKeyword) {
            $("#image").attr("src", "img/アヒル.png"); // 心配コメント
        } else {
            $("#image").attr("src", "img/最初のアヒル.png");// 元に戻る
        }
    }

    // メモ内容が変更されたらキーワードを再チェック
    $("#memo").on("input", checkKeywords);
});