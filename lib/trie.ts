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
}

module.exports = Trie;