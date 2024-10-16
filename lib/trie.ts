class TrieNode {
    children: { [key: string]: TrieNode };
    isEndOfWord: boolean;
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {

    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode();
            }
            node = node.children[word[i]];
        }
        node.isEndOfWord = true;
    }

    search(word: string): boolean {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];

            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix: string): boolean {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }

    suggestHelper(node: TrieNode, curr: string, suggestions: string[]): void {
        if (node.isEndOfWord) {
            suggestions.push(curr);
        }
        if (Object.keys(node.children).length === 0) {
            return;
        }

        for (let child in node.children) {
            this.suggestHelper(node.children[child], curr + child, suggestions);
        }
    }

    suggest(prefix: string) : string[] {
        let node = this.root;
        let curr = "";
        for (let i = 0; i < prefix.length; i++) {
            if (!node.children[prefix[i]]) {
                return [];
            }
            node = node.children[prefix[i]];
            curr += prefix[i];
        }
        let suggestions: string[] = [];
        this.suggestHelper(node, curr, suggestions);
        return suggestions;
    }

}

function testTrie() {
    let words = ["hello", "dog", "hell", "cat", "a", "hel","help","helps","helping"];
    let trie = new Trie();
    words.forEach((word) => trie.insert(word));
    console.log(trie.suggest("hel"));
}

function searchText(text: string) : string[] {
    let words = text.split(" ");
    let trie = new Trie();
    words.forEach((word) => trie.insert(word));
    return trie.suggest("hel");
}