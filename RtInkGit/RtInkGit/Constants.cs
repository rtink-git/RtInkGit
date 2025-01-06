namespace RtInkGit;
static class Constants
{
    #if RELEASE
        internal const string Url = "https://rt.ink";
        internal const int HInSecForCache = 60 * 60;
    #endif
    #if DEBUG
        internal const string Url = "https://localhost:7002";
        internal const int HInSecForCache = 0;
    #endif
        internal const int ThreeHInSecForCache = HInSecForCache * 3;
        internal const int ThirtyDInSecForCache = HInSecForCache * 24 * 30;
}
