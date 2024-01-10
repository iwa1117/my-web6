import React, { useState } from 'react';

// Reactコンポーネントの外に関数を定義
function calculateBMI(weight, height) {
    const heightInMeter = height / 100;
    return (weight / (heightInMeter * heightInMeter)).toFixed(2);
}

function displayResult(bmi) {
    document.getElementById('result').innerHTML = `Your BMI is: ${bmi}`;
}

function showTrainingMenu(selection) {
    let menu = '';
    if (selection === 'active') {
        menu = `<h2>今日はこのメニューを頑張りましょう！</h2>
            <div>
                <input type="checkbox" id="running" />
                <label htmlFor="running">ランニング１５分</label>
            </div>
            <div>
                <input type="checkbox" id="sitUps" />
                <label htmlFor="sitUps">腹筋５０回</label>
            </div>
            <div>
                <input type="checkbox" id="backExercises" />
                <label htmlFor="backExercises">背筋３０回</label>
            </div>
            <div>
                <input type="checkbox" id="pushUps" />
                <label htmlFor="pushUps">腕立て２０回</label>
            </div>
            <div>
                <input type="checkbox" id="burpeeJumps" />
                <label htmlFor="burpeeJumps">バーピージャンプ２０回</label>
            </div>
            <div>
                <input type="checkbox" id="fullBodyStretch" />
                <label htmlFor="fullBodyStretch">全身ストレッチ１０分</label>
            </div>`;
    } else if (selection === 'light') {
            menu= `<h2>今日はこのメニューを頑張りましょう！</h2>
            <div>
                <input type="checkbox" id="sitUps" />
                <label htmlFor="sitUps">腹筋２０回</label>
            </div>
            <div>
                <input type="checkbox" id="pushUps" />
                <label htmlFor="pushUps">腕立て１０回</label>
            </div>
            <div>
                <input type="checkbox" id="fullBodyStretch" />
                <label htmlFor="fullBodyStretch">全身ストレッチ５分</label>
            </div>
            `;
    } else if (selection === 'neutral') {
        menu= `<h2>今日はこのメニューを頑張りましょう！</h2>
        <div>
        <input type="checkbox" id="burpeeJumps" />
        <label htmlFor="burpeeJumps">バーピージャンプ５回</label>
    </div>
    <div>
                <input type="checkbox" id="fullBodyStretch" />
                <label htmlFor="fullBodyStretch">全身ストレッチ１０分</label>
    </div>`;

    } else if (selection === 'strength') {
        menu=`<h2>今日はこのメニューを頑張りましょう！</h2>
        <div>
                <input type="checkbox" id="sitUps" />
                <label htmlFor="sitUps">腹筋５０回</label>
            </div>
            <div>
                <input type="checkbox" id="backExercises" />
                <label htmlFor="backExercises">背筋３０回</label>
            </div>
            <div>
                <input type="checkbox" id="pushUps" />
                <label htmlFor="pushUps">腕立て２０回</label>
            </div>
            <div>
                <input type="checkbox" id="planck" />
                <label htmlFor="burpeeJumps">プランク１分×３回</label>
            </div>
            <div>
                <input type="checkbox" id="fullBodyStretch" />
                <label htmlFor="fullBodyStretch">全身ストレッチ１０分</label>
            </div>`;

    } else if (selection === 'stretch') {
        menu= `<h2>今日はこのメニューを頑張りましょう！</h2>
        <div>
        <input type="checkbox" id="burpeeJumps" />
        <label htmlFor="burpeeJumps">バーピージャンプ１０回</label>
    </div>
    <div>
                <input type="checkbox" id="fullBodyStretch" />
                <label htmlFor="fullBodyStretch">足のストレッチ１０分</label>
    </div>
    <div>
    <input type="checkbox" id="fullBodyStretch" />
    <label htmlFor="fullBodyStretch">上半身のストレッチ１０分</label>
    </div>`;
    }
    return menu;
}

// Reactコンポーネント
export default function App() {
    // 各メニュー項目のチェック状態を管理するstate
    const [checkedItems, setCheckedItems] = useState({
        running: false,
        sitUps: false,
        backExercises: false,
        pushUps: false,
        burpeeJumps: false,
        fullBodyStretch: false,
    });

    // BMIを計算する関数
    const calculateBMI = (weight, height) => {
        const heightInMeter = height / 100;
        return (weight / (heightInMeter * heightInMeter)).toFixed(2);
    };

    // BMI計算をトリガーする関数
    const handleCalculateBMI = () => {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const bmi = calculateBMI(weight, height);
        displayResult(bmi);
    };

    // 気分が変わった時のハンドラー
    const handleMoodChange = (event) => {
        const selectedMood = event.target.value;
        const trainingMenu = showTrainingMenu(selectedMood);
        document.getElementById('trainingMenu').innerHTML = trainingMenu;
    };

    // チェックボックスの変更ハンドラー
    const handleCheckboxChange = (itemName) => {
        setCheckedItems({
            ...checkedItems,
            [itemName]: !checkedItems[itemName],
        });
    };

    // 各メニュー項目のHTMLを生成する関数
    const generateMenuHTML = () => {
        return (
            <div>
                <h2>今日のトレーニングメニュー</h2>
                <div>
                    <input
                        type="checkbox"
                        id="running"
                        checked={checkedItems.running}
                        onChange={() => handleCheckboxChange('running')}
                    />
                    <label htmlFor="running">ランニング１５分</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="sitUps"
                        checked={checkedItems.sitUps}
                        onChange={() => handleCheckboxChange('sitUps')}
                    />
                    <label htmlFor="sitUps">腹筋５０回</label>
                </div>
                {/* 他のメニュー項目のチェックボックスとラベル */}
            </div>
        );
    };

    return (
        <div>
            <h1>今日のダイエット</h1>
            <h2>まずは今の自分の現状を確認しましょう。</h2>
            {/* BMI計算関連の要素 */}
            <input type="number" id="weight" placeholder="体重(kg)" />
            <input type="number" id="height" placeholder="身長(cm)" />
            <button onClick={handleCalculateBMI}>BMIを計算する</button>
            <div id="result"></div>

            {/* 気分選択の要素 */}
            <div>
                <h2>今日はどんな気分ですか？</h2>
                <select id="mood" onChange={handleMoodChange}>
                    <option value="active">いっぱい動きたい</option>
                    <option value="light">ちょっとだけ運動したい</option>
                    <option value="neutral">あんま気分のらない</option>
                    <option value="strength">筋トレ多め</option>
                    <option value="stretch">ストレッチたくさん</option>
                </select>
            </div>

            {/* トレーニングメニュー */}
            <div id="trainingMenu">{generateMenuHTML()}</div>
            <h2>
  全てチェックできたら<a href="../index2.html">こちら</a>をクリックしてください。
  </h2>
        </div>
    );
}
