# 常考算法

## 链表
### 1. 反转链表  
题目描述：输入一个链表，反转链表后，输出新链表。  
思路：可以使用指针实现，也可以使用辅助栈实现，以下使用指针进行实现。使用三个辅助指针，cur，pre和next，cur表示当前结点，在循环中将指针转向，最后输出头指针。  
java实现：  
```java  
/*  
public class ListNode {  
    int val;  
    ListNode next = null;  

    ListNode(int val) {  
        this.val = val;  
    }  
}*/  
public class Solution {  
    public ListNode ReverseList(ListNode head) {  
        if(head == null){  
            return null;  
        }  
        ListNode pre = null;  
        ListNode cur = head;  
        ListNode next = null;  
        while(cur != null){  
            // 改变指针转向  
            next = cur.next;  
            cur.next = pre;  
            pre = cur;  
            cur = next;  
        }  
        return pre;  
    }  
}  
```  
### 2. 二分查找  
题目描述：实现有重复数字的有序数组的二分查找。输出在数组中第一个大于等于查找值的位置，如果数组中不存在这样的数，则输出数组长度加一。  
思路：二分查找中心思想是需要确定左右边界，然后在左边界小于右边界的循环中对数组进行折半处理，确定区间内的操作。  
java实现:  
```java  
public class Solution {  
    /**  
     * 二分查找  
     * @param n int整型 数组长度  
     * @param v int整型 查找值  
     * @param a int整型一维数组 有序数组  
     * @return int整型  
     */  
    public int upper_bound_ (int n, int v, int[] a) {  
        // write code here  
        int left = 0, right = n - 1;  // 初始化左右边界  
        while(left < right){   // 循环  
            int mid = left + (right - left) / 2;  
            if(v <= a[mid]){  // 左半边界处理  
                if(mid == 0 || v > a[mid-1])  
                    return mid + 1;  
                else  
                    right = mid;  
            }  
            else{  
                left = mid + 1;  
            }  
        }  
        return n + 1;  
    }  
}  
```  
### 3. 判断链表是否有环  
题目描述：判断给定的链表中是否有环  
思路：利用快慢指针，快的指针一次前进两步，慢指针一次前进一步，若链表有环，则快指针必追上慢指针。  
java实现：  
```java  
public class Solution {  
    public boolean hasCycle(ListNode head) {  
        ListNode f = head;  
        ListNode s = head;  
        while(f != null && f.next != null){  // 都以快指针进行判断  
            s = s.next;  
            f = f.next.next;  
            if(f == s)  
                return true;  
        }  
        return false;  
    }  
}  
```  
### 4. 判断是否有环 ||  
给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。  
**方法：推导**  
首先使用快慢指针判断链表是否有环，有环则得到第一次相遇点。  
不管什么时候，fast = 2 * slow，所以第一次相遇也是  
假设链表头到入环点距离为a，环长度为b，则这时候fast = slow + n * b  
因此得到：slow = n * b  
因此：slow + a = n * b + a，意味着slow再走a步就能到入环点  
这时再用一个指针从头开始走，当其和slow碰头时，则表示走了a步，到达入环点。  
```java  
public class Solution {  
    public ListNode detectCycle(ListNode head) {  
        boolean cycle = false;  
        if(head == null)  
            return null;  
        ListNode fast = head;  
        ListNode slow = head;  
        while(fast.next != null && fast.next.next != null){  
            fast = fast.next.next;  
            slow = slow.next;  
            if(fast == slow){  
                cycle = true;  
                break;  
            }  
        }  

        if(!cycle)  return null;  
        ListNode q = head;  
        while(q != slow){  
            q = q.next;  
            slow = slow.next;  
        }  

        return q;  
  
    }  
}  
```  

## 二叉树
### 二叉树的所有路径


### 5. 实现二叉树先序、中序、后序遍历  
题目描述：分别按照二叉树先序，中序和后序打印所有的节点。  
思路：使用List集合存储结点，经过遍历后将List集合转换为数组输出  
java实现：  
```java  
public class Solution {  
    /**  
     *  
     * @param root TreeNode类 the root of binary tree  
     * @return int整型二维数组  
     */  
    private static ArrayList<Integer> preNode = new ArrayList<>();  
    private static ArrayList<Integer> midNode = new ArrayList<>();  
    private static ArrayList<Integer> postNode = new ArrayList<>();  
    public int[][] threeOrders (TreeNode root) {  
        // write code here  
        preOrder(root);  
        midOrder(root);  
        postOrder(root);  
        int[][] order = new int[3][];  // 二维数组的声明  
        order[0] = toIntArray(preNode);  
        order[1] = toIntArray(midNode);  
        order[2] = toIntArray(postNode);  
        return order;  
    }  
    // List集合转换为数组  
    public static int[] toIntArray(ArrayList<Integer> arrayList){  
        int[] intArray = arrayList.stream().mapToInt(Integer::valueOf).toArray();  
        return intArray;  
    }  
    public static void preOrder(TreeNode root){  
        if(root != null){  
            preNode.add(root.val);  
            preOrder(root.left);  
            preOrder(root.right);  
        }  
    }  
    public static void midOrder(TreeNode root){  
        if(root != null){  
            midOrder(root.left);  
            midNode.add(root.val);  
            midOrder(root.right);  
        }  
    }  
    public static void postOrder(TreeNode root){  
        if(root != null){  
            postOrder(root.left);  
            postOrder(root.right);  
            postNode.add(root.val);  
        }  
    }  
}  
```  
### 6. 删除链表的倒数第n个结点  
题目描述：给定一个链表，删除链表的倒数第n个节点并返回链表的头指针  
思路：使用快慢指针，快指针比慢指针快n个结点，则当快指针移动到链表末尾时，慢指针指向的结点即为要删除的结点，注意边界条件的判断。  
java实现：  
```java  
public class Solution {  
    /**  
     * @param head ListNode类  
     * @param n int整型  
     * @return ListNode类  
     */  
    public ListNode removeNthFromEnd (ListNode head, int n) {  
        // write code here  
        ListNode slow = head;  
        ListNode fast = head;  
        ListNode pre = null;  
        while(n != 0){  
            fast = fast.next;  // 快指针  
            n--;  
        }  
        if(fast == null){  // 快指针边界，删除第一个结点  
            head = head.next;  
            return head;  
        }  
        while(fast.next != null){  // 注意使用next和不使用next的区别  
            fast = fast.next;  
            slow = slow.next;  
        }  
        slow.next = slow.next.next;  
        return head;  
    }  
}  
```  
### 7. 合并有序链表  
题目描述：将两个有序的链表合并为一个新链表，要求新的链表是通过拼接两个链表的节点来生成的。  
思路：首先取两个有序链表第一个数较小的那个作为头结点，然后在两个链表均不为空时进入循环判断两个链表值，头结点下一个结点指向其中较小的结点，依次拼接，最后直接拼接不为空的那个链表。  
java实现：  
```java  
public class Solution {  
    /**  
     *  
     * @param l1 ListNode类  
     * @param l2 ListNode类  
     * @return ListNode类  
     */  
public static ListNode mergeTwoLists (ListNode l1, ListNode l2) {  
    // 首先处理链表为空的情况  
    if(l1 == null){  
        return l2;  
    }  
    if(l2 == null){  
        return l1;  
    }  
    ListNode l = (l1.val <= l2.val)? l1 : l2; // 取较小结点为头结点  
    ListNode l3 = l; // 头指针  
    l1 = (l == l1)? l1.next : l1; // 处理l1  
    l2 = (l == l2)? l2.next : l2;  
    while(l1 != null && l2 != null){  
        if(l1.val <= l2.val){  
            l.next = l1;  // 拼接结点  
            l1 = l1.next;  
        }  
        else{  
            l.next = l2;  
            l2 = l2.next;  
        }  
        l = l.next;  // 指针后移  
    }  
    l.next = (l1 == null)? l2 : l1;  // 拼接未空的结点  
    // 时间复杂度O(m + n)，空间复杂度O(1)  
    return l3;  
}  
}  
```  
### 8. 括号匹配  
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。  
有效字符串需满足：  
左括号必须用相同类型的右括号闭合。  
左括号必须以正确的顺序闭合。  
**方法：栈**  
使用栈存储字符串的字符，为了括号匹配，若等于'('，则将')'入栈，则出现')'的时候，可以判断栈顶元素是否与其相等，依此类推。  
```java  
class Solution {  
    public static boolean isValid(String s) {  
        Stack<Character> stack = new Stack<>();  

        for(int i = 0; i < s.length(); i++){  
            if(s.charAt(i) == '(')  
                stack.push(')');  
            else if(s.charAt(i) == '[')  
                stack.push(']');  
            else if(s.charAt(i) == '{')  
                stack.push('}');  
            else if(stack.isEmpty() || stack.pop() != s.charAt(i))  
                return false;  
        }  

        return stack.isEmpty();  
    }  
}  
```  
### 9. 整数反转  
给你一个 32 位的有符号整数 x ，返回 x 中每位上的数字反转后的结果。  
如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。  
假设环境不允许存储 64 位整数（有符号或无符号）。  
**方法：%和/**  
本题重点在于溢出的处理，有两种方法：  
* 一种是使用long先存储结果，最后进行判断；  
* 另一种是在运算中使用中间值，若中间值溢出，直接返回，不必再运算。  
```java  
class Solution {  
    public int reverse(int x) {  
        // 先使用long存储res  
        long res = 0;  
        while(x != 0){  
            res = 10 * res + x % 10;  
            x = x / 10;  // x若是负数则x/10也是负数，因此不用单独处理负数  
        }  

        // 溢出则返回0  
        return (int)res == res ? (int)res : 0;  
    }  
}  
```  
```java  
class Solution {  
    public int reverse(int x) {  
        int res = 0;  
        while(x != 0){  
            int tmp = 10 * res + x % 10;  
            // 若tmp溢出，则tmp/10不等于上次的结果，返回  
            if(tmp / 10 != res)  
                return 0;  
            res = tmp;  
            x = x / 10;  
        }  

        return res;  
    }  
}  
```  

## 数字
### 10. 0～n-1中缺失的数字  
一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。  
输入: [0,1,2,3,4,5,6,7,9]  
输出: 8  
**方法：二分查找**  
由于元素有序，且范围在0~n-1，因此当mid的数字等于下标mid时，说明mid前面不缺少数字，i下一轮为mid+1，若不等于，说明mid前面已经确少数字，j下一轮为mid-1。而最终得到的i即为缺失的数字。  
```java  
class Solution {  
    public int missingNumber(int[] nums) {  
        int i = 0, j = nums.length-1;  
        
        // i==j是为了处理特殊情况，如[0]或[1]  
        while(i <= j){  
            int mid = i + (j-i)/2;  
            if(nums[mid] == mid){  
                i = mid + 1;  
            }  
            else{  
                j = mid - 1;  
            }  
        }  

        return i;  
    }  
}  
```  
### 11. LRU缓存机制  
运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。  
实现 LRUCache 类：  
LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存  
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。  
void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。  
**方法1：双向链表+哈希表**  
使用双向链表存储key值，不管是get还是put，始终将最近使用的key值保存在表尾，使用哈希表存储key和value，则最近最少使用的key即为链表头部元素，分情况书写代码。  
```java  
class LRUCache{  

    Queue<Integer> queue;   // 这里不能使用LinkedList声明  
    Map<Integer, Integer> map;  
    int cap;  
    public LRUCache(int capacity){  
        // this是指对象本身，通过this可以调用本对象拥有的所有方法和属性，当然不加this也可以调用。  
        this.queue = new LinkedList<>();  
        this.map = new HashMap<>();  
        this.cap = capacity;  
    }  

    int get(int key){  
        if(queue.contains(key)){  
            queue.remove(key);  
            queue.add(key);  
            return map.get(key);  
        }  
        else{  
            return -1;  
        }  
    }  

    void put(int key, int value){  
        if(queue.contains(key)){  
            queue.remove(key);  
            queue.add(key);  
            map.put(key, value);  
        }  
        else if(cap == 0){  
            map.remove(queue.poll());  
            queue.add(key);  
            map.put(key, value);  
        }  
        else{  
            queue.add(key);  
            map.put(key, value);  
            cap--;  
        }  

    }  
}  

/**  
 * Your LRUCache object will be instantiated and called as such:  
 * LRUCache obj = new LRUCache(capacity);  
 * int param_1 = obj.get(key);  
 * obj.put(key,value);  
 */  
```  
**方法2：手写双向链表+哈希表**  
* 手写一个双向链表类  
* 这里使用头部作为最新结点，尾部为最近最少使用的结点  
* 哈希表存储的是key和Node  
```java  
class LRUCache {  

    HashMap<Integer, Node> map;  
    Node head, tail;  
    int cap;  

    // 设置第一个结点为最新的结点  
    public LRUCache(int capacity) {  
        map = new HashMap<>();  
        cap = capacity;  
        head = new Node(-1, -1);  
        tail = new Node(-1, -1);  
        head.next = tail;  // 设置头尾结点，防止溢出  
        tail.pre = head;  
    }  

    public void put(int key, int value){  
        // 若已经包含key  
        if(map.containsKey(key)){  
            Node node = map.get(key);  
            node.val = value;  
            node.pre.next = node.next;  // 先从中间删除该结点  
            node.next.pre = node.pre;  
            moveToHead(node);    // 移动到头部  
            map.put(key, node);  // 更新map  
        }  
        else if(cap <= 0){  
            map.remove(tail.pre.key);  // 删除key  
            tail.pre.pre.next = tail;  // 删除最后一个结点，即尾结点的前一结点  
            tail.pre = tail.pre.pre;  
            // 注意，这里先新建，不能直接传入，否则map存储的是未链接的链表  
            Node node = new Node(key, value);  
            moveToHead(node);  
            map.put(key, node);  
        }  
        else{  
            // 同样也要新建  
            Node node = new Node(key, value);  
            moveToHead(node);  
            map.put(key, node);  
            cap--;  
        }  
    }  

    public int get(int key){  
        if(map.containsKey(key)){  
            Node node = map.get(key);  
            node.pre.next = node.next;  
            node.next.pre = node.pre;  
            moveToHead(node);  
            
            return node.val;  
        }  
        return -1;  
    }  

    // 双向链表类  
    private class Node{  
        int key, val;  
        Node pre, next;  
        Node(int key, int val){  
            this.key = key;  
            this.val = val;  
        }  
    }  

    // 移动到头结点之后，即最新的结点  
    private void moveToHead(Node node){  
        node.next = head.next;  
        node.next.pre = node;  
        head.next = node;  
        node.pre = head;  
    }  
}  
```  
### 12. 从中序与后序遍历序列构造二叉树  
中序遍历 inorder = [9,3,15,20,7]  
后序遍历 postorder = [9,15,7,20,3]  
返回前序序列为：[3,9,20,15,7]  
**方法：哈希+递归**  
知道中序和后序，我们使用如下方法构造树：  
（1）后序的最后一位为根节点，找到根结点在中序中的位置，假设为i。  
（2）中序中根节点左边即为左子树，右边为右子树。左子树的区间在后序中对应的即为从左向右第i个位置。右子树的区间则为i+1到倒数第二个数。  
（3）由以上进行递归构造树，直到左边位置大于右边位置，则返回null。  
其中，我们使用全局变量存储后序序列，使用哈希表存储中序序列和对应的位置。  
```java  
/**  
 * Definition for a binary tree node.  
 * public class TreeNode {  
 *     int val;  
 *     TreeNode left;  
 *     TreeNode right;  
 *     TreeNode(int x) { val = x; }  
 * }  
 */  
class Solution {  
    int[] post;  
    HashMap<Integer, Integer> map = new HashMap<>();  
    public TreeNode buildTree(int[] inorder, int[] postorder) {  
        for(int i = 0; i < inorder.length; i++){  
            map.put(inorder[i], i);  
        }  
        post = postorder;  
        return helper(0, inorder.length-1, 0, post.length-1);  
    }  

    public TreeNode helper(int ileft, int iright, int pleft, int pright){  
        if(ileft > iright || pleft > pright){  
            return null;  
        }  
        int p = post[pright];  
        int position = map.get(p);  
        TreeNode node = new TreeNode(p);  
        node.left = helper(ileft, position-1, pleft, pleft+position-ileft-1);  
        node.right = helper(position+1, iright, pleft+position-ileft, pright-1);  
        return node;  
    }  
}  
```  
### 13. 只出现一次的数字  
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。  
说明：  
你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？  
**方法：位运算-异或**  
异或满足：  
1. 交换律：a ^ b ^ c = a ^ c ^ b  
2. 任何数和0异或都等于自身：0 ^ n = n  
3. 相同的数异或为0：n ^ n = 0  

```java  
class Solution {  
    public int singleNumber(int[] nums) {  
        int result = 0;  
        for(int i = 0; i < nums.length; i++){  
            result = nums[i] ^ result;  
        }  
        return result;  

    }  
}  
```  

### 14. 全排列  
给定一个没有重复数字的序列，返回其所有可能的全排列。  
**方法：经典回溯**  
（1）声明res保存结果，声明visited数组保存状态  
（2）声明一个tmp保存当前路径，若tmp大小等于数组长度，说明遍历完成，添加该路径  
（3）在dfs中，遍历num数组，根据visited数组控制循环并添加元素  
```java  
class Solution {  
    public List<List<Integer>> permute(int[] nums) {  

        List<List<Integer>> res = new ArrayList<>();  
        int[] visited = new int[nums.length];  

        dfs(nums, visited, res, new ArrayList<Integer>());  
        return res;  
    }  

    public void dfs(int[] nums, int[] visited, List<List<Integer>> res, ArrayList<Integer> tmp){  
        if(tmp.size() == nums.length){  
            res.add(new ArrayList<>(tmp));  
            return;  
        }  

        for(int i = 0; i < nums.length; i++){  
            if(visited[i] == 1)  
                continue;  
            visited[i] = 1;  
            tmp.add(nums[i]);  
            dfs(nums, visited, res, tmp);  
            visited[i] = 0;  
            tmp.remove(tmp.size()-1);  
        }  
    }  
}  
```  
### 15. 二叉树中和为某一值的路径  
输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。  
**方法：回溯**  
（1）声明res保存结果，本题中状态变化根据结点值变化得到  
（2）dfs中，首先添加结点值，这时候sum要减去当前结点值，path加入该结点值  
（3）当sum为0并且当前结点为叶子结点时，满足条件，res中添加该path，否则就递归左右子树进行上述操作  
（4）回溯：路径删除最后一位，此时由于sum已经在递归中依次计算，所以不用加上当前结点值  
```java  
class Solution {  
    public List<List<Integer>> pathSum(TreeNode root, int sum) {  
        List<List<Integer>> res = new ArrayList<>();  

        dfs(root, res, new ArrayList<Integer>(), sum);  

        return res;  
    }  

    public void dfs(TreeNode root, List<List<Integer>> res, ArrayList<Integer> path, int sum){  
        if(root == null){  
            return;  
        }  

        sum = sum - root.val;  
        path.add(root.val);  
        if(sum == 0 && root.left == null && root.right == null){  
            res.add(new ArrayList<>(path));  
        }  
        else{  
            dfs(root.left, res, path, sum);  
            dfs(root.right, res, path, sum);  
        }  
        path.remove(path.size()-1);  
    }  
}  
```  
### 16. 对称的二叉树  
请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。  
**方法：递归**  
1. 递归的函数要干什么？  
* 函数的作用是判断传入的两个树是否镜像。  
* 输入：TreeNode left, TreeNode right  
* 输出：是：true，不是：false  
2. 递归停止的条件是什么？  
* 左节点和右节点都为空 -> 倒底了都长得一样 ->true  
* 左节点为空的时候右节点不为空，或反之 -> 长得不一样-> false  
* 左右节点值不相等 -> 长得不一样 -> false  
3. 从某层到下一层的关系是什么？  
* 要想两棵树镜像，那么一棵树左边的左边要和二棵树右边的右边镜像，一棵树左边的右边要和二棵树右边的左边镜像  
* 调用递归函数传入左左和右右，调用递归函数传入左右和右左  
* 只有左左和右右镜像且左右和右左镜像的时候，我们才能说这两棵树是镜像的  
* 调用递归函数，我们想知道它的左右孩子是否镜像，传入的值是root的左孩子和右孩子。这之前记得判个root==null。  
```java  
class Solution {  
    public boolean isSymmetric(TreeNode root) {  
        if(root == null)  
            return true;  
        return helper(root.left, root.right);  
    }  
    public boolean helper(TreeNode left, TreeNode right){  
        if(left == null && right == null)  
            return true;  
        if(left == null || right == null)  
            return false;  
        return left.val == right.val && helper(left.left, right.right) && helper(left.right, right.left);  
    }  

}  
```  
### 17. 连续子数组的最大和  
输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。  
要求时间复杂度为O(n)。  
**方法：动态规划**  
* 首先定义dp数组，dp[i]就表示以元素nums[i]结尾的连续子数组最大和  
* 状态如何转移？首先，若dp[i-1]为负值，则加上nums[i]的值只会更小，所以将其丢弃，取nums[i]，若dp[i-1]为正，则取dp[i-1] + nums[i]。因此状态转移方程：dp[i] = Math.max(dp[i-1] + nums[i], nums[i]);  
* 在循环中使用max记录最大值，循环结束后输出最大值即可。  
```java  
class Solution {  
    public int maxSubArray(int[] nums) {  
        int[] dp = new int[nums.length];  
        dp[0] = nums[0];  
        int res = dp[0];  

        for(int i = 1; i < nums.length; i++){  
            dp[i] = Math.max(nums[i], dp[i-1] + nums[i]);  
            res = Math.max(dp[i], res);  
        }  
        return res;  
    }  
}  
```  

## 字符串
### 18. 最长不含重复字符的子字符串  
请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。  
**方法：滑动窗口**  
* 使用set维护一个不重复的窗口  
* 元素不重复，则添加到set，右窗口右滑，然后计算最大值  
* 元素若重复，则从左边开始删除，向右滑动，直到删除了与之重复的元素  
```java  
class Solution {  
    public int lengthOfLongestSubstring(String s) {  
        Set<Character> set = new HashSet<>();  
        int max = 0;  
        for(int left = 0, right = 0; right < s.length(); right++){  
            char c = s.charAt(right);  
            while(set.contains(c)){  
                set.remove(s.charAt(left++)); // set的添加顺序和字符串顺序一致，所以这样滑动  
            }  
            set.add(c);  
            max = Math.max(right - left + 1, max);  
        }  

        return max;  
    }  
}  
```  
### 19. 两个链表相加  
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。  
请你将两个数相加，并以相同形式返回一个表示和的链表。  
你可以假设除了数字 0 之外，这两个数都不会以 0 开头。  
输入：l1 = [2,4,3], l2 = [5,6,4]  
输出：[7,0,8]  
解释：342 + 465 = 807  
**方法：数字和+进位**  
* 两个链表从前到后开始累加数字，得到该位的值与进位，进位初始值为0  
* 后面的数字也依然累加，然后会加上前面得到的进位值  
* 创建链表链接到每一位后面  
* 循环结束条件：两个链表都为空或者进位为0  
```java  
class Solution {  
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {  
        ListNode root = new ListNode(0);  
        ListNode cur = root;  
        int carry = 0;  
        while(l1 != null || l2 != null || carry != 0){  
            int l1val = l1 != null ? l1.val : 0;  
            int l2val = l2 != null ? l2.val : 0;  
            int sum = l1val + l2val + carry;  
            carry = sum / 10;  
            ListNode node = new ListNode(sum % 10);  
            cur.next = node;  
            cur = node;  

            if(l1 != null)  l1 = l1.next;  
            if(l2 != null) l2 = l2.next;  
        }  

        return root.next;  
    }  
}  
```  
### 20. 三数之和  
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。  
注意：答案中不可以包含重复的三元组。  
输入：nums = [-1,0,1,2,-1,-4]  
输出：[[-1,-1,2],[-1,0,1]]  
**方法：排序+双指针**  
* 将数组排序，然后设置两个指针，指向当前元素的下一个元素和最后一个元素  
* 三数相加，若等于0则加入，否则移动指针  
* 注意：很多坑，见代码  
```java  
class Solution {  
    public List<List<Integer>> threeSum(int[] nums) {  
        List<List<Integer>> res = new ArrayList<>();  

        Arrays.sort(nums);  
        for(int k = 0; k < nums.length-2; k++){  
            // 加个小判断  
            if(nums[k] > 0)  
                return res;  
            // 1. 去重，否则会有重复元素  
            if(k > 0 && nums[k] == nums[k-1])  
                continue;  

            int i = k + 1;  
            int j = nums.length - 1;  
            while(i < j){  
                int sum = nums[k] + nums[i] + nums[j];  
                if(sum == 0){  
                    List<Integer> list = new ArrayList<>();  
                    list.add(nums[k]);  
                    list.add(nums[i]);  
                    list.add(nums[j]);  
                    res.add(list);  
                    // 2. 去重，这里去除的是双指针中的重复元素  
                    while(i < j && nums[i+1] == nums[i])  i++;  
                    while(i < j && nums[j] == nums[j-1])  j--;  
                    // 3. 注意，这里还要移动指针，否则会无限循环  
                    i++;  
                    j--;  
                }  
                else if(sum > 0){  
                    j--;    
                }  
                else{  
                    i++;  
                }  
            }  
        }  
        return res;  
    }  
}  
```  
### 21. K个一组翻转链表  
给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。  
k 是一个正整数，它的值小于或等于链表的长度。  
如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。  
给你这个链表：1->2->3->4->5  
当 k = 2 时，应当返回: 2->1->4->3->5  
当 k = 3 时，应当返回: 3->2->1->4->5  
**方法：操作就完了**  
```java  
class Solution {  
    public ListNode reverseKGroup(ListNode head, int k) {  
        ListNode dummyHead = new ListNode(0);  
        ListNode pre = dummyHead, cur = head, next = null;  
        dummyHead.next = head;  
        int len = 0;  
        while(head != null){  
            len++;  
            head = head.next;  
        }  

        for(int i = 0; i < len / k; i++){  
            for(int j = 0; j < k - 1; j++){  
                // 神奇的操作  
                next = cur.next;  
                cur.next = next.next;  
                next.next = pre.next;  
                pre.next = next;  
            }  
            // 操作++  
            pre = cur;  
            cur = pre.next;  
        }  

        return dummyHead.next;  

    }  
}  
```  
### 22. 最长回文子串(5)  
给你一个字符串 s，找到 s 中最长的回文子串。  
输入：s = "babad"  
输出："bab"  
解释："aba" 同样是符合题意的答案。  
[leetcode](https://leetcode.cn/problems/longest-palindromic-substring/description/)   
**方法：中心扩展法**  
* 遍历每一个字符，然后从其向两边扩展，获取该字符的回文最大长度  
* 由于要输出子串，所以需要记录最长时的左右位置，所以设置一个range数组记录  
* 当字符的右区间-左区间 > range范围时，则range重新赋值  
```java  
class Solution {  
    public String longestPalindrome(String s) {  
        // 中心扩展法，对每一个字符向两边扩展  
        if(s.length() <= 1)  
            return s;  
        
        int[] range = new int[2];  
        for(int i = 0; i < s.length() - 1; i++){  
            findLongest(s, i, range);  // 传入位置和range  
        }  

        return s.substring(range[0], range[1] + 1);  // 这里要 + 1  
    }  

    public void findLongest(String s, int k, int[] range){  
        int right = k, right = k;  
        // 细节，小于length-1，防止right越界，然后后面比较时right+1  
        while(right < s.length() - 1 && s.charAt(right+1) == s.charAt(left))  
            right++;  

        // 注意，left不是>=0，right不是小于length，然后判断时分别-1和+1，防止溢出和漏比较  
        while(left > 0 && right < s.length() - 1 && s.charAt(left-1) == s.charAt(right+1)){  
            left--;  
            right++;  
        }  
        if(right - left > range[1] - range[0]){  
            range[0] = left;  
            range[1] = right;  
        }  
    }  
}  
```  
### 23. 回文链表  
判断一个链表是否为回文链表  
输入: 1->2->2->1  
输出: true  
**方法：快慢指针+反转链表**  
* 定义快慢指针，遍历链表，得到链表中点的过程中反转链表前半部分  
* 注意遍历条件，以及最终慢指针的位置  
* 接着比较前半部分链表与后半部分链表的值  
```java  
class Solution {  
    public boolean isPalindrome(ListNode head) {  
        if(head == null || head.next == null)  
            return true;  

        ListNode slow = head, fast = head;  
        ListNode pre = null;  
        // 若为偶数，则slow为中间的右边节点，若为偶数，slow在中间  
        while(fast != null && fast.next != null){  
            fast = fast.next.next;  
            ListNode tmp = slow.next;  
            slow.next = pre;  
            pre = slow;  
            slow = tmp;  
        }  
        // 奇数链表，中间一个节点不比较  
        if(fast != null){  
            slow = slow.next;  
        }  
        while(slow != null){  
            if(pre.val != slow.val)  
                return false;  
            slow = slow.next;  
            pre = pre.next;  
        }  
        return true;  
    
    }  
}  
```  


### 24. 二分查找  
请实现有重复数字的升序数组的二分查找。  
输出在数组中第一个大于等于查找值的位置，如果数组中不存在这样的数(指不存在大于等于查找值的数)，则输出数组长度加一。  
输入：5,4,[1,2,4,4,5]  
输出：3  
**方法：二分**  
二分模板题目，注意while循环中left和right的关系，以及mid和+1、-1的区别。  
```java  
public class Solution {  
    /**  
     * 二分查找  
     * @param n int整型 数组长度  
     * @param v int整型 查找值  
     * @param a int整型一维数组 有序数组  
     * @return int整型  
     */  
    public int upper_bound_ (int n, int v, int[] a) {  
        int left = 0, right = n - 1;  
        while(left <= right){  
            int mid = left + (right - left) / 2;  
            if(v <= a[mid]){  
                if(mid == 0 || v > a[mid-1])  
                    return mid + 1;  
                else  
                    right = mid - 1;  
            }  
            else{  
                left = mid + 1;  
            }  
        }  
        return n + 1;  
    }  
}  
```  
### 25. 版本号比较  
给你两个版本号 version1 和 version2 ，请你比较它们。  

版本号由一个或多个修订号组成，各修订号由一个 '.' 连接。每个修订号由 多位数字 组成，可能包含 前导零 。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，2.5.33 和 0.1 都是有效的版本号。  
比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 忽略任何前导零后的整数值 。也就是说，修订号 1 和修订号 001 相等 。如果版本号没有指定某个下标处的修订号，则该修订号视为 0 。例如，版本 1.0 小于版本 1.1 ，因为它们下标为 0 的修订号相同，而下标为 1 的修订号分别为 0 和 1 ，0 < 1 。  
返回规则如下：  
如果 version1 > version2 返回 1，  
如果 version1 < version2 返回 -1，  
除此之外返回 0。  
**方法：split+循环**  
* 使用split分隔为字符数组，比较字符数组的大小  
* 使用Integer.valueOf()转换为数字，如果某一方为空则置为0比较  
```java  
class Solution {  
    public int compareVersion(String version1, String version2) {  
        String[] strArr1 = version1.split("\\.");  // 转义两次  
        String[] strArr2 = version2.split("\\.");  

        for(int i = 0; i < Math.max(strArr1.length, strArr2.length); i++){  
            int m = i < strArr1.length ? Integer.valueOf(strArr1[i]) : 0;  
            int n = i < strArr2.length ? Integer.valueOf(strArr2[i]) : 0;  
            if(m > n)  
                return 1;  
            if(m < n)  
                return -1;  
        }  
        
        return 0;  
    }  
}  
```  
### 26. 乘积最大子数组  
给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。  
输入: [2,3,-2,4]  
输出: 6  
解释: 子数组 [2,3] 有最大乘积 6。  
**方法：动态规划思想**  
* 定义初始变量imax和imin，保存最大值和最小值  
* 如果数组的数时负数，则相乘之后最大的会变成最小的，最小的会变成最大的  
* 因此交换最大值和最小值，继续遍历比较，注意当前项要和nums[i]比较  
```java  
class Solution {  
    public int maxProduct(int[] nums) {  
        if(nums.length <= 0)  
            return -1;  
        int max = Integer.MIN_VALUE;  
        int iMax = 1, iMin = 1;  
        for(int i = 0; i < nums.length; i++){  
            // 交换最大最小值  
            if(nums[i] < 0){  
                int tmp = iMax;  
                iMax = iMin;  
                iMin = tmp;  
            }  
            // 注意，要和nums[i]比较  
            iMax = Math.max(nums[i], iMax * nums[i]);  
            iMin = Math.min(nums[i], iMin * nums[i]);  

            max = Math.max(max, iMax);  
        }  

        return max;  

    }  
}  
```  
### 27. 最长公共子序列  
给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。  
一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。  
例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。  
若这两个字符串没有公共子序列，则返回 0。  
输入：text1 = "abcde", text2 = "ace"  
输出：3  
解释：最长公共子序列是 "ace"，它的长度为 3。  
**方法：动态规划**  
* 二维数组动态规划，dp[i][j]从三个方向获取值，分别为上、左、左上  
* 当有元素相等时，子序列长度加1，否则长度等于左和上的较大值  
```java  
class Solution {  
    public int longestCommonSubsequence(String text1, String text2) {  
        int m = text1.length();  
        int n = text2.length();  
        int[][] dp = new int[m+1][n+1];  
        for(int i = 1; i <= m; i++){  
            for(int j = 1; j <= n; j++){  
                if(text1.charAt(i-1) == text2.charAt(j-1))  
                    dp[i][j] = dp[i-1][j-1] + 1;  
                else  
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);  
            }  
        }  

        return dp[m][n];  
    }  
}  
```  
### 28. 合并k个升序链表  
给你一个链表数组，每个链表都已经按升序排列。  
请你将所有链表合并到一个升序链表中，返回合并后的链表。  
输入：lists = [[1,4,5],[1,3,4],[2,6]]  
输出：[1,1,2,3,4,4,5,6]  
解释：链表数组如下：  
[  
  1->4->5,  
  1->3->4,  
  2->6  
]  
将它们合并到一个有序链表中得到。  
1->1->2->3->4->4->5->6  
**方法：优先队列 —— PriorityQueue**  


### 29. 圆圈中最后剩下的数字(约瑟夫环)  
0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。  
例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。  
输入: n = 5, m = 3  
输出: 3  
**方法：递推公式**  
解析：[约瑟夫环](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/solution/huan-ge-jiao-du-ju-li-jie-jue-yue-se-fu-huan-by-as/)  
```java  
class Solution {
public:
    int lastRemaining(int n, int m) {
        int pos = 0; // 最终活下来那个人的初始位置
        for(int i = 2; i <= n; i++){
            pos = (pos + m) % i;  // 每次循环右移
        }
        return pos;
    }
}  
```  
## 动态规划

## 其他


## 方法简记
